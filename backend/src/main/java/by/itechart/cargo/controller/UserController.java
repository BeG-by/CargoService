package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.user.*;
import by.itechart.cargo.exception.AlreadyExistException;
import by.itechart.cargo.exception.IncorrectPasswordException;
import by.itechart.cargo.exception.NotFoundException;
import by.itechart.cargo.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/v1/api/users")
@Validated
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> findAll() {
        return userService.findAll();
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody @Valid UserSaveRequest userRequest) throws AlreadyExistException {
        userService.save(userRequest);
        return ResponseEntity.ok("User has been saved");
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable long id) throws NotFoundException {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PutMapping
    public ResponseEntity<String> update(@RequestBody @Valid UserUpdateRequest userUpdateRequest) throws NotFoundException, AlreadyExistException {
        userService.update(userUpdateRequest);
        return ResponseEntity.ok("User has been updated");
    }

    @PutMapping("/photo")
    public ResponseEntity<String> updatePhoto(@RequestBody @Valid PhotoRequest photoRequest)
            throws NotFoundException {
        userService.updatePhoto(photoRequest);
        return ResponseEntity.ok("Photo has been updated");
    }

    @PutMapping("/phone")
    public ResponseEntity<String> updatePhone(@RequestBody @Valid PhoneRequest phoneRequest)
            throws NotFoundException {
        userService.updatePhone(phoneRequest);
        return ResponseEntity.ok("Phone has been updated");
    }

    @PutMapping("/password")
    public ResponseEntity<String> updatePassword(@RequestBody @Valid PasswordRequest passwordRequest)
            throws IncorrectPasswordException {
        userService.updatePassword(passwordRequest);
        return ResponseEntity.ok("Phone has been updated");
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoResponse> findInfo() {
        return ResponseEntity.ok(userService.findInfo());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) throws NotFoundException {
        userService.delete(id);
        return ResponseEntity.ok("User has been deleted");
    }

}
