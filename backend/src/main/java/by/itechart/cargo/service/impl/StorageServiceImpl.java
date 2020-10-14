package by.itechart.cargo.service.impl;

import by.itechart.cargo.dto.model_dto.storage.StoragePaginationResponse;
import by.itechart.cargo.dto.model_dto.storage.StorageSaveRequest;
import by.itechart.cargo.dto.model_dto.storage.StorageUpdateRequest;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.model.Address;
import by.itechart.cargo.model.Storage;
import by.itechart.cargo.repository.ClientCompanyRepository;
import by.itechart.cargo.repository.ProductOwnerRepository;
import by.itechart.cargo.repository.StorageRepository;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static by.itechart.cargo.service.util.MessageConstant.STORAGE_NOT_FOUND_MESSAGE;

@Service
@Transactional
@Slf4j
public class StorageServiceImpl implements StorageService {

    private final StorageRepository storageRepository;
    private final ClientCompanyRepository clientCompanyRepository;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public StorageServiceImpl(StorageRepository storageRepository,
                              ClientCompanyRepository clientCompanyRepository,
                              ProductOwnerRepository productOwnerRepository,
                              JwtTokenUtil jwtTokenUtil) {

        this.storageRepository = storageRepository;
        this.clientCompanyRepository = clientCompanyRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }


    @Override
    public StoragePaginationResponse findAll(int page, int storagesPerPage) {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        PageRequest pageRequest = PageRequest.of(page, storagesPerPage);
        List<Storage> storages = storageRepository.findAllByClientCompanyIdAndStatus(companyId, Storage.Status.ACTIVE, pageRequest);
        long totalAmount = storageRepository.countAllByClientCompanyIdAndStatus(companyId, Storage.Status.ACTIVE);
        return new StoragePaginationResponse(totalAmount, storages);
    }

    @Override
    public Storage findById(long id) throws NotFoundException {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        return storageRepository.findByIdAndClientCompanyId(id, companyId)
                .filter(storage -> !storage.getStatus().equals(Storage.Status.DELETED))
                .orElseThrow(() -> new NotFoundException(STORAGE_NOT_FOUND_MESSAGE));
    }

    @Override
    public void save(StorageSaveRequest saveRequest) throws AlreadyExistException {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        final Storage storage = saveRequest.toStorage();
        final String email = saveRequest.getEmail();

        if (storageRepository.findByEmailAndClientCompanyId(email, companyId)
                .filter(s -> !s.getStatus().equals(Storage.Status.DELETED))
                .isPresent()) {
            throw new AlreadyExistException(String.format("Storage with email '%s' already exists", email));
        }

        storage.setClientCompany(clientCompanyRepository.getOne(companyId));

        storageRepository.save(storage);

        log.info("Storage has been saved {}", storage);

    }

    @Override
    public void update(StorageUpdateRequest updateRequest) throws NotFoundException, AlreadyExistException {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        final Long storageId = updateRequest.getId();
        final String email = updateRequest.getEmail();

        final Storage storage = storageRepository.findByIdAndClientCompanyId(storageId, companyId)
                .filter(s -> !s.getStatus().equals(Storage.Status.DELETED))
                .orElseThrow(() -> new NotFoundException(STORAGE_NOT_FOUND_MESSAGE));

        final boolean isEmailExist = storageRepository.findByEmailAndClientCompanyId(email, companyId)
                .filter(s -> !s.getStatus().equals(Storage.Status.DELETED) && !s.getId().equals(storageId))
                .isPresent();

        if (isEmailExist) {
            throw new AlreadyExistException(String.format("Storage with email '%s' already exists", email));
        }


        storage.setAddress(new Address(
                updateRequest.getCountry(),
                updateRequest.getCity(),
                updateRequest.getStreet(),
                updateRequest.getHouse(),
                updateRequest.getFlat())
        );

        storage.setEmail(email);
        storage.setPhone(updateRequest.getPhone());

        log.info("Storage has been updated {}", storage);


    }

    @Override
    public void delete(long storageId) throws NotFoundException {
        final long companyId = jwtTokenUtil.getCurrentCompanyId();
        storageRepository.findByIdAndClientCompanyId(storageId, companyId)
                .map(storage -> {
                    storage.setStatus(Storage.Status.DELETED);
                    log.info("Storage has been deleted {}", storage);
                    return storage;
                })
                .orElseThrow(() -> new NotFoundException(STORAGE_NOT_FOUND_MESSAGE));
    }

}
