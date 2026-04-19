package com.example.logistic.controller;

import com.example.logistic.DTO.Declarations.*;
import com.example.logistic.DTO.Documents.CreateDocumentDTO;
import com.example.logistic.entity.CusDeclarations;
import com.example.logistic.service.ICusDeclarationService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/declaration")
@CrossOrigin("*")
public class DeclarationController {
    @Autowired
    private ICusDeclarationService cusDeclarationService;


    @PostMapping(value="/create/{shipmentCode}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createDeclaration(@PathVariable("shipmentCode") String shipmentCode,
                                                    @RequestParam("data") String dataJson,
                                                    @RequestParam(value = "file", required = false) MultipartFile file) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        // Parse trực tiếp chuỗi JSON thành CreateNewDTO
        CreateNewDTO dto = mapper.readValue(dataJson, CreateNewDTO.class);
        String doc= cusDeclarationService.createDeclaration(shipmentCode,dto,file);
        return ResponseEntity.ok(doc);
    }

    @GetMapping("/detail/{shipmentCode}")
    public ResponseEntity<DetailDTO> detailDeclaration(@PathVariable ("shipmentCode") String shipmentCode) throws Exception {
        return  ResponseEntity.ok(cusDeclarationService.detailDeclaration(shipmentCode));
    }
    @GetMapping(value="/detail/{declarationCode}/file", produces = MediaType.APPLICATION_PDF_VALUE)
    @ResponseBody
    private ResponseEntity<Resource> previewFile(@PathVariable ("declarationCode") String declarationCode) throws Exception {
        return cusDeclarationService.loadFile(declarationCode);
    }

    @PutMapping("/update/{declarationCode}")
    public ResponseEntity<UpdateLog> updateLog(@PathVariable ("declarationCode") String declarationCode,
                                               @RequestBody  LogDTO dto){
        UpdateLog updateLog= cusDeclarationService.update(declarationCode,dto);
        return ResponseEntity.ok(updateLog );
    }

}
