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
    public ResponseEntity<ServiceResponeDTO> createService(@RequestBody CreateServiceDTO dto){
        return ResponseEntity.ok(serviceService.createService(dto));
    }

    @PutMapping("/update/{serviceCode}")
    public ResponseEntity<ServiceResponeDTO> updateService(@PathVariable("serviceCode") String serviceCode,
                                                           @RequestBody ServiceResponeDTO dto){
        return ResponseEntity.ok(serviceService.updateService(serviceCode,dto));
    }

    @DeleteMapping("/delete/{serviceCode}")
    public void deleteService(@PathVariable("serviceCode") String serviceCode){
        serviceService.deleteService(serviceCode);
    }
}

