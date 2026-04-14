package com.example.logistic.service;

import com.example.logistic.DTO.ShipmentDTO.ListDTO;
import com.example.logistic.DTO.ShipmentDTO.Page1DTO.InformationDTO;

import java.util.List;

public interface IShipmentService {
    List<ListDTO> findAll();
    List<ListDTO> searchAndFilter(String search,String filter);
    InformationDTO detailInfor(String shipmentCode);
}
