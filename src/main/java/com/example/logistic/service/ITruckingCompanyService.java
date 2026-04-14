package com.example.logistic.service;

import com.example.logistic.DTO.TruckingCompanyDTO.CreateDTO;
import com.example.logistic.DTO.TruckingCompanyDTO.ListDTO;
import com.example.logistic.DTO.TruckingCompanyDTO.ResponeSearchDTO;

import java.util.List;

public interface ITruckingCompanyService {
    List<ListDTO> findAll();
    ListDTO createTrucking(CreateDTO dto);
    ListDTO detailTrucking(String companyCode);
    ListDTO updateTrucking(String companyCode, ListDTO dto);
    List<ListDTO> findByName(String companyName);
    List<ResponeSearchDTO>  selectAll();
}
