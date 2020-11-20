package by.itechart.cargo.controller;

import by.itechart.cargo.dto.model_dto.stats.LossesAndProfitDTO;
import by.itechart.cargo.service.util.StatDataGenerateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

import static by.itechart.cargo.security.RoleConstant.OWNER;

@RestController
@RequestMapping("v1/api/stats")
public class StatisticController {

    private final StatDataGenerateUtil statDataGenerateUtil;

    @Autowired
    public StatisticController(StatDataGenerateUtil statDataGenerateUtil) {
        this.statDataGenerateUtil = statDataGenerateUtil;
    }

    @GetMapping
    @Secured({OWNER})
    public ResponseEntity<List<LossesAndProfitDTO>> getProfitAndLosses(@RequestParam String start, @RequestParam String end) {
        return ResponseEntity.ok(statDataGenerateUtil.generateData(LocalDate.parse(start), LocalDate.parse(end)));
    }

}
