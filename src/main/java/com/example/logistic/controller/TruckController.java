package com.example.logistic.controller;

import com.example.logistic.DTO.Trucks.GetAllTruckDTO;
import com.example.logistic.DTO.Trucks.InTransit.GetTransportDTO;
import com.example.logistic.DTO.Trucks.TruckItemDTO;
import com.example.logistic.DTO.Trucks.UpdateTruckDTO;
import com.example.logistic.service.ITruckingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trucking")
@CrossOrigin("*")
public class TruckController {
    @Autowired
    private ITruckingService truckingService;

    @GetMapping("/{shipmentCode}")
    public ResponseEntity<GetAllTruckDTO> getTruckVessel(@PathVariable ("shipmentCode") String shipmentCode){
        return ResponseEntity.ok(truckingService.getTruckVessel(shipmentCode));
    }
    @PostMapping("/create/{shipmentCode}")
    public ResponseEntity<String> createTruck(@PathVariable ("shipmentCode") String shipmentCode,
                                              @RequestBody GetAllTruckDTO dto){
        String result= truckingService.createTruck(shipmentCode,dto);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/update/{shipmentCode}")
    public ResponseEntity<GetAllTruckDTO> updateTruck(@PathVariable ("shipmentCode") String shipmentCode,
                                                      @RequestBody UpdateTruckDTO dto){

        return ResponseEntity.ok(truckingService.updateTruck(shipmentCode,dto));
    }
    @DeleteMapping("/{truckCode}")
    public ResponseEntity<Void> deleteTruck(@PathVariable ("truckCode") String truckCode){
       truckingService.deleteTruck(truckCode);
        return  ResponseEntity.ok().build();
    }
    @GetMapping("/transport/{shipmentCode}")
    public ResponseEntity<List<GetTransportDTO>> getTransport(@PathVariable ("shipmentCode") String shipmentCode){
        return ResponseEntity.ok(truckingService.getTruck(shipmentCode));
    }
}

