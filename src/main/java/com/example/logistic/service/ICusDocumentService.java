package com.example.logistic.service;

import com.example.logistic.DTO.Documents.CreateDocumentDTO;
import com.example.logistic.DTO.Documents.CreateReqestDTO;
import com.example.logistic.DTO.Documents.DetailDocument;
import com.example.logistic.DTO.Documents.ListDTO;
import com.example.logistic.entity.CusDocuments;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICusDocumentService {
    List<ListDTO> findAll(String shipmentCode);
    String createDocument(String shipmentCode,CreateDocumentDTO dto, MultipartFile file) throws IOException;
    DetailDocument detailDocument(String documentCode) throws IOException;
    ResponseEntity<Resource> loadFile(String documentCode) throws IOException;
    String updateDocument(String documentCode, CreateReqestDTO dto,MultipartFile file) throws IOException;
}
