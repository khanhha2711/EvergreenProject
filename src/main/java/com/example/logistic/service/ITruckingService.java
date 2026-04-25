package com.example.logistic.service;

import com.example.logistic.DTO.Trucks.GetAllTruckDTO;
import com.example.logistic.DTO.Trucks.InTransit.GetTransportDTO;
import com.example.logistic.DTO.Trucks.TruckItemDTO;
import com.example.logistic.DTO.Trucks.UpdateTruckDTO;

import java.util.List;

public interface ITruckingService {
    GetAllTruckDTO getTruckVessel(String shipmentCode);
    String  createTruck(String shipmentCode, GetAllTruckDTO dto);
    GetAllTruckDTO updateTruck(String shipmentCode, UpdateTruckDTO dto);
    void  deleteTruck(String truckCode);
    List<GetTransportDTO> getTruck(String shipmentCode);
}
