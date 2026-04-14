package com.example.logistic.service;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import com.example.logistic.DTO.Documents.ListDTO;
import com.example.logistic.DTO.Documents.LogDTO;
import com.example.logistic.common.FileService;
import com.example.logistic.entity.CusDocuments;
import com.example.logistic.repository.ICusDocumentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CusDocumentService implements ICusDocumentService{
    @Autowired
    private ICusDocumentRepository cusDocumentRepository;
    @Autowired
    private FileService fileService;

    public static  final String UPLOAD_DIR= "D:/TTTN/Uploads/cusDocument/";


    @Override
    public List<ListDTO> findAll(String shipmentCode) {
        return  cusDocumentRepository.findByShipmentCode(shipmentCode)
                .stream()
                .map(this:: mapToList)
                .toList();
    }

    private ListDTO mapToList(CusDocuments cusDocuments) {
        ListDTO dto= new ListDTO();
        dto.setDocumentCode(cusDocuments.getDocumentCode());
        dto.setDocumentNumber(cusDocuments.getDocumentNumber());
        dto.setDocumentType(cusDocuments.getDocumentType());

        LogDTO logDTO= new LogDTO();
        logDTO.setCreatedAt(cusDocuments.getCreateAt());
        logDTO.setStatus(cusDocuments.getStatus());
        logDTO.setDescription(cusDocuments.getDescription());
        dto.setLogDTO(logDTO);

        if(cusDocuments.getAttachment()!= null){
            AttachmentDTO attachmentDTO= null;
            try {
                attachmentDTO = fileService.buildAttachment(
                        cusDocuments.getAttachment(),
                        UPLOAD_DIR,
                        "/cusDocument/"+cusDocuments.getDocumentCode()+"/file"
                );
            } catch (IOException e) {
                throw new RuntimeException("Error building attachment", e);
            }
            dto.setAttachment(attachmentDTO);
        }
        return  dto;
    }
}
