package com.example.logistic.controller;

import com.example.logistic.DTO.Trucks.GetAllTruckDTO;
import com.example.logistic.DTO.VesselBooking.GetAllVesselDTO;
import com.example.logistic.service.IVesselBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vessel")
@CrossOrigin("*")
public class VesselBookingController {
    @Autowired
    private IVesselBookingService vesselBookingService;

    @GetMapping("/{shipmentCode}")
    public GetAllVesselDTO detailVessel(@PathVariable ("shipmentCode") String shipmentCode){
        return vesselBookingService.detailVessel(shipmentCode);
    }
    @PostMapping("/create/{shipmentCode}")
    public ResponseEntity<String> createVessel(@PathVariable ("shipmentCode") String shipmentCode,
                                               @RequestBody GetAllVesselDTO dto){
        String result= vesselBookingService.createVessel(shipmentCode,dto);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/update/{shipmentCode}")
    public ResponseEntity<String> updateVessel(@PathVariable ("shipmentCode") String shipmentCode,
                                               @RequestBody GetAllVesselDTO dto){
        String result= vesselBookingService.updateVessel(shipmentCode,dto);
        return ResponseEntity.ok(result);
    }
}
