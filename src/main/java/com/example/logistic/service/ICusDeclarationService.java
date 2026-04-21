package com.example.logistic.service;

import com.example.logistic.DTO.Declarations.*;
import com.example.logistic.entity.CusDeclarations;
import com.example.logistic.entity.LogDeclarations;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICusDeclarationService {
    String createDeclaration(String shipmentCode, CreateNewDTO dto, MultipartFile file) throws Exception;
    DetailDTO detailDeclaration(String shipmentCode) throws Exception;
    ResponseEntity<Resource> loadFile(String declarationCode) throws IOException;
    UpdateLog update(String declarationCode, LaneAndLogDTO logs);
}
