package com.example.logistic.service;

import com.example.logistic.DTO.Declarations.CreateNewDTO;
import com.example.logistic.entity.CusDeclarations;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICusDeclarationService {
    String createDeclaration(String shipmentCode, CreateNewDTO dto, MultipartFile file) throws Exception;
    CusDeclarations showList(String shipmentCode);
}
