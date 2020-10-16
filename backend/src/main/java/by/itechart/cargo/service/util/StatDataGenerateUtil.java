package by.itechart.cargo.service.util;

import by.itechart.cargo.dto.model_dto.stats.LossesAndProfitDTO;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StatDataGenerateUtil {

    private List<LossesAndProfitDTO> dataList;

    @PostConstruct
    private void init() {
        dataList = new ArrayList<>();

        final LossesAndProfitDTO dto1 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 1), "115", "111");
        final LossesAndProfitDTO dto2 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 2), "133", "33");
        final LossesAndProfitDTO dto3 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 3), "311", "233");
        final LossesAndProfitDTO dto4 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 4), "321", "211");
        final LossesAndProfitDTO dto5 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 5), "322", "222");
        final LossesAndProfitDTO dto6 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 6), "321", "190");
        final LossesAndProfitDTO dto7 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 7), "445", "321");
        final LossesAndProfitDTO dto8 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 8), "313", "143");
        final LossesAndProfitDTO dto9 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 9), "456", "333");
        final LossesAndProfitDTO dto10 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 10), "453", "111");
        final LossesAndProfitDTO dto11 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 11), "345", "331");
        final LossesAndProfitDTO dto12 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 12), "699", "304");
        final LossesAndProfitDTO dto13 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 13), "789", "244");
        final LossesAndProfitDTO dto14 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 14), "689", "313");
        final LossesAndProfitDTO dto15 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 15), "600", "331");
        final LossesAndProfitDTO dto16 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 16), "786", "331");
        final LossesAndProfitDTO dto17 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 17), "765", "564");
        final LossesAndProfitDTO dto18 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 18), "654", "433");
        final LossesAndProfitDTO dto19 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 19), "599", "345");
        final LossesAndProfitDTO dto20 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 20), "656", "321");
        final LossesAndProfitDTO dto21 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 21), "556", "345");
        final LossesAndProfitDTO dto22 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 22), "564", "333");
        final LossesAndProfitDTO dto23 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 23), "543", "321");
        final LossesAndProfitDTO dto24 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 24), "454", "335");
        final LossesAndProfitDTO dto25 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 25), "565", "322");
        final LossesAndProfitDTO dto26 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 26), "456", "234");
        final LossesAndProfitDTO dto27 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 27), "567", "453");
        final LossesAndProfitDTO dto28 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 28), "564", "399");
        final LossesAndProfitDTO dto29 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 29), "324", "331");
        final LossesAndProfitDTO dto30 = new LossesAndProfitDTO(LocalDate.of(2020, 9, 30), "456", "319");
        final LossesAndProfitDTO lossesAndProfitDTO = new LossesAndProfitDTO(LocalDate.of(2020, 10, 1), "115", "111");
        final LossesAndProfitDTO lossesAndProfitDTO1 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 2), "133", "33");
        final LossesAndProfitDTO lossesAndProfitDTO2 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 3), "311", "233");
        final LossesAndProfitDTO lossesAndProfitDTO3 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 4), "301", "211");
        final LossesAndProfitDTO lossesAndProfitDTO4 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 5), "233", "222");
        final LossesAndProfitDTO lossesAndProfitDTO5 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 6), "211", "190");
        final LossesAndProfitDTO lossesAndProfitDTO6 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 7), "222", "321");
        final LossesAndProfitDTO lossesAndProfitDTO7 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 8), "133", "143");
        final LossesAndProfitDTO lossesAndProfitDTO8 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 9), "312", "333");
        final LossesAndProfitDTO lossesAndProfitDTO9 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 10), "211", "211");
        final LossesAndProfitDTO lossesAndProfitDTO10 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 11), "333", "331");
        final LossesAndProfitDTO lossesAndProfitDTO11 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 12), "321", "304");
        final LossesAndProfitDTO lossesAndProfitDTO12 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 13), "321", "244");
        final LossesAndProfitDTO lossesAndProfitDTO13 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 14), "543", "313");
        final LossesAndProfitDTO lossesAndProfitDTO14 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 15), "600", "331");
        final LossesAndProfitDTO lossesAndProfitDTO15 = new LossesAndProfitDTO(LocalDate.of(2020, 10, 16), "603", "331");


        dataList.add(lossesAndProfitDTO);
        dataList.add(lossesAndProfitDTO1);
        dataList.add(lossesAndProfitDTO2);
        dataList.add(lossesAndProfitDTO3);
        dataList.add(lossesAndProfitDTO4);
        dataList.add(lossesAndProfitDTO5);
        dataList.add(lossesAndProfitDTO6);
        dataList.add(lossesAndProfitDTO7);
        dataList.add(lossesAndProfitDTO8);
        dataList.add(lossesAndProfitDTO9);
        dataList.add(lossesAndProfitDTO10);
        dataList.add(lossesAndProfitDTO11);
        dataList.add(lossesAndProfitDTO12);
        dataList.add(lossesAndProfitDTO13);
        dataList.add(lossesAndProfitDTO14);
        dataList.add(lossesAndProfitDTO15);
        dataList.add(dto1);
        dataList.add(dto2);
        dataList.add(dto3);
        dataList.add(dto4);
        dataList.add(dto5);
        dataList.add(dto6);
        dataList.add(dto7);
        dataList.add(dto8);
        dataList.add(dto9);
        dataList.add(dto10);
        dataList.add(dto11);
        dataList.add(dto12);
        dataList.add(dto13);
        dataList.add(dto14);
        dataList.add(dto15);
        dataList.add(dto16);
        dataList.add(dto17);
        dataList.add(dto18);
        dataList.add(dto19);
        dataList.add(dto20);
        dataList.add(dto21);
        dataList.add(dto22);
        dataList.add(dto23);
        dataList.add(dto24);
        dataList.add(dto25);
        dataList.add(dto26);
        dataList.add(dto27);
        dataList.add(dto28);
        dataList.add(dto29);
        dataList.add(dto30);


    }


    public List<LossesAndProfitDTO> generateData(LocalDate start, LocalDate end) {
        return dataList.stream()
                .filter(item -> {
                    if(item.getDate().equals(start) || item.getDate().equals(end)) {
                        return true;
                    }
                    return item.getDate().isAfter(start) && item.getDate().isBefore(end);
                })
                .collect(Collectors.toList());


    }


}
