package com.example.logistic.service;


import com.example.logistic.DTO.VesselBooking.GetAllVesselDTO;

public interface IVesselBookingService {
    GetAllVesselDTO detailVessel(String shipmentCode);
    String createVessel(String shipmentCode,GetAllVesselDTO dto);
    String updateVessel(String shipmentCode,GetAllVesselDTO dto);
}
