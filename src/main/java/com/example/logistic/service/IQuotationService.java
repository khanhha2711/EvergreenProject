package com.example.logistic.service;

import com.example.logistic.DTO.QuotationDTO.ListQuoDTO;
import com.example.logistic.DTO.QuotationDTO.QuotationResponseDTO;
import com.example.logistic.DTO.QuotationDTO.UpdateQuotationDTO;
import com.example.logistic.entity.Quotations;
import com.example.logistic.entity.Requests;

import java.util.List;

public interface IQuotationService {
    List<ListQuoDTO> findAll();
    QuotationResponseDTO createQuotation(String requestCode, String employeeCode);
    QuotationResponseDTO detailQuotation(String quotationCode);
    void updateStatus(String quotationCode,String status);
    List<ListQuoDTO> searchAndFilter(String search,String filter);
    void updateQuotation(String quotationCode,UpdateQuotationDTO dto);
}
