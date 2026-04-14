package com.example.logistic.controller;

import com.example.logistic.DTO.Contracts.RequestDTO;
import com.example.logistic.DTO.Documents.CreateDocumentDTO;
import com.example.logistic.DTO.Documents.CreateReqestDTO;
import com.example.logistic.DTO.Documents.DetailDocument;
import com.example.logistic.DTO.Documents.ListDTO;
import com.example.logistic.entity.CusDocuments;
import com.example.logistic.service.ICusDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin("*")
public class CusDocumentController {
    @Autowired
    private ICusDocumentService cusDocumentService;

    @GetMapping("/{shipmentCode}")
    public List<ListDTO> showList(@PathVariable ("shipmentCode") String shipmentCode){
        return cusDocumentService.findAll(shipmentCode);
    }

    @PostMapping("/create/{shipmentCode}")
    public ResponseEntity<String> createDocument(@PathVariable ("shipmentCode") String shipmentCode,
                                                 @ModelAttribute CreateDocumentDTO dto,
                                                 @RequestParam(value = "file", required = false) MultipartFile file) throws Exception{
        String doc= cusDocumentService.createDocument(shipmentCode,dto,file);
        return ResponseEntity.ok(doc);
    }
    @GetMapping("/detail/{documentCode}")
    public ResponseEntity<DetailDocument> detailDocument(@PathVariable ("documentCode") String documentCode) throws IOException {
        return ResponseEntity.ok(cusDocumentService.detailDocument(documentCode));
    }
    @GetMapping(value="/detail/{documentCode}/file", produces = MediaType.APPLICATION_PDF_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> previewFile(@PathVariable ("documentCode") String documentCode) throws IOException {
        return cusDocumentService.loadFile(documentCode);
    }

    @PutMapping("/update/{documentCode}")
    public ResponseEntity<String> updateDocument(@PathVariable ("documentCode") String documentCode,
                                                 @ModelAttribute CreateReqestDTO dto,
                                                 @RequestParam(value ="file",required = false) MultipartFile file) throws Exception{
        return ResponseEntity.ok(cusDocumentService.updateDocument(documentCode,dto,file));
    }
}
