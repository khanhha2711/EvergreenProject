package com.example.logistic.controller;

import com.example.logistic.DTO.Contracts.Detail.RespDTO;
import com.example.logistic.DTO.Contracts.ListDTO;
import com.example.logistic.DTO.Contracts.RequestDTO;
import com.example.logistic.service.IContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/contracts")
@CrossOrigin("*")
public class ContractController {
    @Autowired
    private IContractService contractService;

    @GetMapping("")
    public List<ListDTO> showList(@RequestParam (name="search",required = false)String search,
                                     @RequestParam (name="filter",required = false) String filter){
        boolean isSearchEmpty = (search == null || search.isEmpty());
        boolean isFilterEmpty = (filter == null || filter.isEmpty());

        if ((isSearchEmpty && isFilterEmpty)) {
            return contractService.findAll();
        }
        return contractService.searchAndFilter(search, filter);

    }

    @PostMapping("/create")
    public ResponseEntity<String> createContract(
                                @ModelAttribute RequestDTO dto,
                                @RequestParam(value = "file", required = false) MultipartFile file) throws Exception
    {
        String resp = contractService.createContract(dto, file);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/{contractCode}")
    public ResponseEntity<RespDTO> detailContract(@PathVariable (name="contractCode") String contractCode) throws IOException{
        return ResponseEntity.ok(contractService.DetailContract(contractCode));
    }
    @GetMapping(value="/{contractCode}/file", produces = MediaType.APPLICATION_PDF_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> previewFile(@PathVariable ("contractCode") String contractCode) throws IOException {
        return contractService.loadFile(contractCode);
    }
    //done
}
