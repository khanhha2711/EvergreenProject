package com.example.logistic.service;

import com.example.logistic.DTO.Container.ContainerDTO;
import com.example.logistic.DTO.Contracts.Detail.AttachmentDTO;
import com.example.logistic.DTO.Declarations.*;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;
import com.example.logistic.common.FileService;
import com.example.logistic.entity.*;
import com.example.logistic.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DeclarationService implements  ICusDeclarationService{
    @Autowired
    private ICusDeclarationRepository cusDeclarationRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private IShipmentRepository shipmentRepository;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private IContainerRepository containerRepository;
    @Autowired
    private ILogDeclarationRepository logDeclarationRepository;

    public static  final String UPLOAD_DIR= "D:/TTTN/Uploads/Declarations/";
    @Override
    @Transactional
    public String createDeclaration(String shipmentCode, CreateNewDTO dto, MultipartFile file) throws Exception {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw  new RuntimeException("Shipment không tồn tại");
        }

        shipments.setStatus("Khai báo hải quan");
        shipmentRepository.save(shipments);

        CusDeclarations cusDeclarations= cusDeclarationRepository.findByShipmentCode(shipmentCode);
        if(cusDeclarations != null &&
                cusDeclarations.getShipment().equals(shipments)) {
            throw new RuntimeException("Tờ khai đã tồn tại, chỉ được phép cập nhật");
        }
        if(dto.getContainer() == null || dto.getContainer().isEmpty()){
            throw new RuntimeException("Phải có ít nhất 1 container");
        }
        String attachment=null;
        if(file!= null && !file.isEmpty()){
            attachment= fileService.uploadFile(file,UPLOAD_DIR);
        }
        CusDeclarations newdeclaration= new CusDeclarations();
        newdeclaration.setShipment(shipments);
        newdeclaration.setDeclarationNumber(dto.getDeclarationNumber());
        newdeclaration.setLane("NULL");
        newdeclaration.setStatus("CREATED");
        newdeclaration.setCustomsBranch(dto.getCustomsBranch());
        newdeclaration.setDeclarationDate(dto.getDeclarationDate());
        newdeclaration.setAttachment(attachment);

        List<Containers> list= new ArrayList<>();
       for(ContainerDTO c: dto.getContainer()){
           Containers containers =new Containers();
           containers.setContainerNumber(c.getContainerNumber());
           containers.setSealNumber(c.getSealNumber());
           containers.setTypeContainer(c.getContainerType());
           containers.setCusDeclaration(newdeclaration);
           list.add(containers);
       }
       newdeclaration.setContainers(list);

        CusDeclarations saved= cusDeclarationRepository.saveAndFlush(newdeclaration);
        entityManager.refresh(saved);
        return saved.getDeclarationCode();
    }


    @Override
    @Transactional
    public DetailDTO detailDeclaration(String shipmentCode) throws Exception{
        CusDeclarations cusDeclarations= cusDeclarationRepository.findByShipmentCode(shipmentCode);
        if(cusDeclarations == null){
           return null;
        }
        DetailDTO dto= new DetailDTO();

        DeclarationDTO declarationDTO= new DeclarationDTO();
        declarationDTO.setDeclarationCode(cusDeclarations.getDeclarationCode());
        declarationDTO.setDeclarationNumber(cusDeclarations.getDeclarationNumber());
        declarationDTO.setLane(cusDeclarations.getLane());
        declarationDTO.setStatus(cusDeclarations.getStatus());
        declarationDTO.setDeclarationDate(cusDeclarations.getDeclarationDate());
        declarationDTO.setCustomsBranch(cusDeclarations.getCustomsBranch());

        dto.setDto(declarationDTO);
        if(cusDeclarations.getAttachment() != null){
            AttachmentDTO attachmentDTO= fileService.buildAttachment(
                    cusDeclarations.getAttachment(),
                    UPLOAD_DIR,
                    "/declaration/detail/"+cusDeclarations.getDeclarationCode()+"/file"
            );
            dto.setAttachment(attachmentDTO);
        }
        List<Containers> containers=containerRepository.findByDeclarationId(cusDeclarations.getId());
        List<ContainerDTO> list= containers.stream().map(containerList -> {
            ContainerDTO containerDTO= new ContainerDTO();
            containerDTO.setContainerNumber(containerList.getContainerNumber());
            containerDTO.setContainerType(containerList.getTypeContainer());
            containerDTO.setSealNumber(containerList.getSealNumber());
            containerDTO.setContainerCode(containerList.getContainerCode());
            return containerDTO;
        }).toList();
        dto.setContainer(list);
        List<LogDeclarations> logDeclarations=logDeclarationRepository.findByDeclarationId(cusDeclarations.getId());
        List<LogDTO> logDTOS= logDeclarations.stream().map(logs->{
            LogDTO logDTO= new LogDTO();
            logDTO.setTitle(logs.getTitle());
            logDTO.setCreatedAt(LocalDateTime.now());
            logDTO.setDescription(logs.getDescription());
            return logDTO;
        }).toList();
        dto.setLog(logDTOS);

        Employees employees= cusDeclarations.getShipment().getContract().getQuotations().getEmployee();
        ActivityDTO activityDTO= new ActivityDTO();
        activityDTO.setAction("");
        activityDTO.setUser(employees.getUser().getUserName());
        activityDTO.setTimestamp(LocalDateTime.now().toString());
        dto.setActivityDTO(activityDTO);
        return dto;
    }

    @Override
    public ResponseEntity<Resource> loadFile(String declarationCode) throws IOException {
        CusDeclarations declarations= cusDeclarationRepository.findByDeclarationCode(declarationCode);
        if(declarations == null  || declarations.getAttachment()== null){
            return ResponseEntity.notFound().build();
        }

        return fileService.loadFile(declarations.getAttachment(),UPLOAD_DIR);
    }

    @Override
    @Transactional
    public UpdateLog update(String declarationCode,LaneAndLogDTO logs) {
        CusDeclarations cusDeclarations= cusDeclarationRepository.findByDeclarationCode(declarationCode);
        if(cusDeclarations == null){
            return null;
        }

        if (logs.getLane() != null) {
            cusDeclarations.setLane(logs.getLane());
            cusDeclarationRepository.save(cusDeclarations);
        }
        LogDeclarations logDTO= new LogDeclarations();
        logDTO.setDeclarations(cusDeclarations);
        logDTO.setTitle(logs.getLogDTO().getTitle());
        logDTO.setDescription(logs.getLogDTO().getDescription());
        logDTO.setCreatedAt(LocalDateTime.now());
        logDeclarationRepository.save(logDTO);


        LogDTO log= new LogDTO();
        log.setTitle(logDTO.getTitle());
        log.setDescription(logDTO.getDescription());
        log.setCreatedAt(logDTO.getCreatedAt());

        Employees employees= cusDeclarations.getShipment().getContract().getQuotations().getEmployee();
        ActivityDTO activityDTO= new ActivityDTO();
        activityDTO.setAction("");
        activityDTO.setTimestamp(LocalDateTime.now().toString());
        activityDTO.setUser(employees.getUser().getUserName());

        UpdateLog updateLog= new UpdateLog();
        updateLog.setLane(cusDeclarations.getLane());
        updateLog.setLogDTO(log);
        updateLog.setActivityDTO(activityDTO);

        return updateLog;
    }
}
