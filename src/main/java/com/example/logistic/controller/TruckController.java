package com.example.logistic.controller;

import com.example.logistic.DTO.Trucks.CreateDTO;
import com.example.logistic.service.ITruckingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trucking")
@CrossOrigin("*")
public class TruckController {
    @Autowired
    private ITruckingService truckingService;


    @PostMapping("/create")
    public ResponseEntity<Void> createTruck(@RequestBody CreateDTO dto){
        truckingService.CreateTruck(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}

