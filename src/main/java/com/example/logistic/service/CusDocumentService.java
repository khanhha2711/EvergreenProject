package com.example.logistic.service;

import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import com.example.logistic.DTO.Documents.*;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;
import com.example.logistic.common.FileService;
import com.example.logistic.entity.CusDocuments;
import com.example.logistic.entity.Employees;
import com.example.logistic.entity.LogDocuments;
import com.example.logistic.entity.Shipments;
import com.example.logistic.repository.ICusDocumentRepository;
import com.example.logistic.repository.ILogDocumentRepository;
import com.example.logistic.repository.IShipmentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CusDocumentService implements ICusDocumentService{
    @Autowired
    private ICusDocumentRepository cusDocumentRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private IShipmentRepository shipmentRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ILogDocumentRepository logDocumentRepository;
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

    @Override
    @Transactional
    public String createDocument(String shipmentCode,CreateDocumentDTO dto, MultipartFile file)  throws IOException {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);

        if (shipments == null) {
            throw new RuntimeException("Shipment not found");
        }

        List<CusDocuments> cusDocuments=cusDocumentRepository.findByShipmentCode(shipmentCode);
        for(CusDocuments documents:cusDocuments){
            if(documents.getDocumentNumber().equals(dto.getDocumentNumber())){
                throw  new RuntimeException("The document already exists, only updating is permitted!");
            }
        }
        String attachment = null;
        if (file != null && !file.isEmpty()) {
            attachment = fileService.uploadFile(file, UPLOAD_DIR);
        }
        CusDocuments newDoc= new CusDocuments();
        newDoc.setShipment(shipments);
        newDoc.setDocumentNumber(dto.getDocumentNumber());
        newDoc.setDocumentType(dto.getDocumentType());
        newDoc.setCreateAt(LocalDateTime.now());
        newDoc.setAttachment(attachment);
        CusDocuments saved = cusDocumentRepository.saveAndFlush(newDoc);

        entityManager.refresh(saved);

        return saved.getDocumentCode();
    }

    @Override
    @Transactional
    public DetailDocument detailDocument(String documentCode) throws IOException {
        CusDocuments documents= cusDocumentRepository.findByDocumentCode(documentCode);
        if(documents == null){
            throw  new RuntimeException("The document does not exist.");
        }
        DetailDocument detailDocument= new DetailDocument();
        ListDTO dto= new ListDTO();
        dto.setDocumentCode(documents.getDocumentCode());
        dto.setDocumentType(documents.getDocumentType());
        dto.setDocumentNumber(documents.getDocumentNumber());

        if(documents.getAttachment() != null){
            AttachmentDTO attachmentDTO= fileService.buildAttachment(
                    documents.getAttachment(),
                    UPLOAD_DIR,
                    "/documents/detail/"+documentCode+"/file"
            );
            dto.setAttachment(attachmentDTO);
        }
        detailDocument.setList(dto);
        List<LogDocuments> log= logDocumentRepository.findByDocumentId(documents.getId());
        List<LogDTO> logDTOS= log.stream().map(logs ->{

            LogDTO logDTO= new LogDTO();
            logDTO.setDocumentName(logs.getDocumentName());
            logDTO.setDescription(logs.getDescription());
            logDTO.setCreatedAt(logs.getCreatedAt());
            return logDTO;
                }).toList();
        detailDocument.setLog(logDTOS);
        Employees employees= documents.getShipment().getContract().getQuotations().getEmployee();
        ActivityDTO activityDTO=new ActivityDTO();
        activityDTO.setUser(employees.getUser().getUserName());
        activityDTO.setAction("");
        activityDTO.setTimestamp(documents.getCreateAt()!=null ? documents.getCreateAt().toString():null);
        detailDocument.setActivity(activityDTO);
        return detailDocument;
    }

    @Override
    public ResponseEntity<Resource> loadFile(String documentCode) throws IOException {
        CusDocuments documents= cusDocumentRepository.findByDocumentCode(documentCode);
        if(documents == null  || documents.getAttachment()== null){
           return ResponseEntity.notFound().build();
        }

        return fileService.loadFile(documents.getAttachment(),UPLOAD_DIR);
    }

    @Override
    @Transactional
    public String updateDocument(String documentCode, CreateReqestDTO dto, MultipartFile file) throws IOException {
        CusDocuments cusDocuments= cusDocumentRepository.findByDocumentCode(documentCode);
        if(cusDocuments == null){
            throw new RuntimeException("The document does not exist.");
        }

        LogDocuments logDocuments=new LogDocuments();
        logDocuments.setDocuments(cusDocuments);
        logDocuments.setDocumentName(cusDocuments.getDocumentType());
        logDocuments.setCreatedAt(LocalDateTime.now());
        logDocuments.setDescription(dto.getDescription());

        logDocumentRepository.save(logDocuments);

        if(file !=null && !file.isEmpty()){
            String newFile= fileService.uploadFile(file,UPLOAD_DIR);
            cusDocuments.setAttachment(newFile);
        }
        if(dto.getDocumentType()!=null){
            cusDocuments.setDocumentType(dto.getDocumentType());
        }
        cusDocumentRepository.save(cusDocuments);
        return "Update successfully";
    }

}
