package com.example.logistic.controller;

import com.example.logistic.DTO.TruckingCompanyDTO.CreateDTO;
import com.example.logistic.DTO.TruckingCompanyDTO.ListDTO;
import com.example.logistic.DTO.TruckingCompanyDTO.ResponeSearchDTO;
import com.example.logistic.service.ITruckingCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company")
@CrossOrigin("*")
public class TruckingCompanyController {
    @Autowired
    private ITruckingCompanyService truckingCompanyService;

    @GetMapping("")
    public List<ListDTO> showList(@RequestParam (value = "search",required = false) String search){
        if(search ==null || search.isEmpty()){
            return truckingCompanyService.findAll();
        }
        return truckingCompanyService.findByName(search);
    }

    @PostMapping("/create")
    public ResponseEntity<ListDTO> createCom(@RequestBody CreateDTO dto){
        return ResponseEntity.ok(truckingCompanyService.createTrucking(dto));
    }

    @GetMapping("/{companyCode}")
    public ListDTO detailTrucking(@PathVariable("companyCode") String companyCode){
        return truckingCompanyService.detailTrucking(companyCode);
    }

    @PutMapping("/update/{companyCode}")
    public ResponseEntity<ListDTO> updateTrucking(@PathVariable ("companyCode") String companyCode, @RequestBody ListDTO dto){
        return ResponseEntity.ok(truckingCompanyService.updateTrucking(companyCode,dto));
    }

    @GetMapping("/select")
    public List<ResponeSearchDTO> selectCompany(){
        return truckingCompanyService.selectAll();
    }
}
