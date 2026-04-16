package com.example.logistic.service;

import com.example.logistic.DTO.Declarations.ContainerDTO;
import com.example.logistic.DTO.Declarations.CreateNewDTO;
import com.example.logistic.common.FileService;
import com.example.logistic.entity.Containers;
import com.example.logistic.entity.CusDeclarations;
import com.example.logistic.entity.Shipments;
import com.example.logistic.repository.ICusDeclarationRepository;
import com.example.logistic.repository.ILogDocumentRepository;
import com.example.logistic.repository.IShipmentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public static  final String UPLOAD_DIR= "D:/TTTN/Uploads/Declarations/";
    @Override
    @Transactional
    public String createDeclaration(String shipmentCode, CreateNewDTO dto, MultipartFile file) throws Exception {
        Shipments shipments= shipmentRepository.findByShipmentCode(shipmentCode);
        if(shipments == null){
            throw  new RuntimeException("Shipment không tồn tại");
        }

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
        newdeclaration.setLane(dto.getLane());
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
    public CusDeclarations showList(String shipmentCode) {
       return cusDeclarationRepository.findByShipmentCode(shipmentCode);

    }
}
