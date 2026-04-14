package com.example.logistic.service;

import com.example.logistic.DTO.Documents.ListDTO;

import java.util.List;

public interface ICusDocumentService {
    List<ListDTO> findAll(String shipmentCode);

}
