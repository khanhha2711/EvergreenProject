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
}
