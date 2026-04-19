package com.example.logistic.controller;

import com.example.logistic.DTO.Container.SelectDTO;
import com.example.logistic.service.IContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/containers")
@CrossOrigin("*")
public class ContainerController {
    @Autowired
    private IContainerService containerService;

    @GetMapping("/{shipmentCode}")
    public List<SelectDTO> selectContainer(@PathVariable("shipmentCode") String shipmentCode){
        return containerService.seachAll(shipmentCode);
    }
}
