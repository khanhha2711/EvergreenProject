package com.example.logistic.controller;

import com.example.logistic.DTO.ServiceDTO.CreateServiceDTO;
import com.example.logistic.DTO.ServiceDTO.ListDTO;
import com.example.logistic.DTO.ServiceDTO.ServiceResponeDTO;
import com.example.logistic.service.IServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin("*")
public class ServiceController {
    @Autowired
    private IServiceService serviceService;

    @GetMapping("")
    public List<ListDTO> showList(@RequestParam(value = "search", required = false) String search){
        if(search ==null || search.isEmpty()){
            return  serviceService.findAll();
        }
        return serviceService.findByServiceName(search);
    }
    @GetMapping("/detail/{serviceCode}")
    public ServiceResponeDTO detailService(@PathVariable ("serviceCode") String serviceCode){
        return serviceService.detailService(serviceCode);

    }
    @PostMapping("/create")
    public ResponseEntity<String> createService(@RequestBody CreateServiceDTO dto){
        String result= serviceService.createService(dto);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/update/{serviceCode}")
    public ResponseEntity<String> updateService(@PathVariable ("serviceCode")String serviceCode){
        String result= serviceService.updateService(serviceCode);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete/{serviceCode}")
    public void deleteService(@PathVariable("serviceCode") String serviceCode){
        serviceService.deleteService(serviceCode);
    }
}

