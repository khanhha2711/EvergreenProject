package com.example.logistic.service;

import com.example.logistic.DTO.ShippingLineDTO.CreateDTO;
import com.example.logistic.DTO.ShippingLineDTO.ListDTO;
import com.example.logistic.DTO.ShippingLineDTO.ResponeSearchDTO;

import java.util.List;

public interface IShippingLineService {
    List<ListDTO> findAll();
    ListDTO createShipping(CreateDTO dto);
    ListDTO detailShipping(String shippingCode);
    ListDTO updateShipping(String shippingCode, ListDTO dto);
    List<ListDTO> findByName(String shippingCode);
    List<ResponeSearchDTO> searchAll();
}
