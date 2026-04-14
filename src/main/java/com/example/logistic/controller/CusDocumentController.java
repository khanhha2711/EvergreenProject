package com.example.logistic.controller;

import com.example.logistic.DTO.Documents.ListDTO;
import com.example.logistic.service.ICusDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
