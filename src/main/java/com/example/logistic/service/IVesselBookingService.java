package com.example.logistic.service;


import com.example.logistic.DTO.VesselBooking.GetAllVesselDTO;

public interface IVesselBookingService {
    GetAllVesselDTO detailVessel(String shipmentCode);

}
