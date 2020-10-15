package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.stats.LossesAndProfitDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("v1/api/stats")
public class StatisticController {

    @GetMapping
    public ResponseEntity<?> getProfitAndLosses() {

        List<LossesAndProfitDTO> list = new ArrayList<>();

        final LossesAndProfitDTO lossesAndProfitDTO = new LossesAndProfitDTO(LocalDate.of(2020, 1, 1), "115", "111");
        final LossesAndProfitDTO lossesAndProfitDTO1 = new LossesAndProfitDTO(LocalDate.of(2020, 1, 2), "133", "33");
        final LossesAndProfitDTO lossesAndProfitDTO2 = new LossesAndProfitDTO(LocalDate.of(2020, 1, 3), "311", "233");
        final LossesAndProfitDTO lossesAndProfitDTO3 = new LossesAndProfitDTO(LocalDate.of(2020, 1, 4), "301", "211");
        final LossesAndProfitDTO lossesAndProfitDTO4 = new LossesAndProfitDTO(LocalDate.of(2020, 1, 5), "233", "222");
        final LossesAndProfitDTO lossesAndProfitDTO5 = new LossesAndProfitDTO(LocalDate.of(2020, 1, 6), "211", "190");

        list.add(lossesAndProfitDTO);
        list.add(lossesAndProfitDTO1);
        list.add(lossesAndProfitDTO2);
        list.add(lossesAndProfitDTO3);
        list.add(lossesAndProfitDTO4);
        list.add(lossesAndProfitDTO5);


        return ResponseEntity.ok(list);
    }


}
