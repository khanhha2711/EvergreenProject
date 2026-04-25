package com.example.logistic.service;

import com.example.logistic.DTO.ShipmentDTO.ListDTO;
import com.example.logistic.DTO.ShipmentDTO.OverViewDTO;
import com.example.logistic.DTO.ShipmentDTO.Page1DTO.InformationDTO;
import com.example.logistic.DTO.ShipmentDTO.StatusDTO;

import java.util.List;

public interface IShipmentService {
    List<ListDTO> findAll();
    List<ListDTO> searchAndFilter(String search,String filter);
    InformationDTO detailInfor(String shipmentCode);
    String updateStatus(String shipmentCode, StatusDTO dto);
    List<OverViewDTO> getView(String shipmentCode);
}
