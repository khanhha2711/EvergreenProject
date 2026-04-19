package com.example.logistic.service;

import com.example.logistic.DTO.Container.SelectDTO;

import java.util.List;

public interface IContainerService {
    List<SelectDTO> seachAll(String shipmentCode);
}
