package com.example.logistic.service;

import com.example.logistic.DTO.Contracts.Detail.ContentDTO;
import com.example.logistic.DTO.Contracts.Detail.RespDTO;
import com.example.logistic.DTO.Contracts.ListDTO;
import com.example.logistic.DTO.Contracts.RequestDTO;
import com.example.logistic.entity.Contracts;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IContractService {
    String createContract(RequestDTO dto, MultipartFile file) throws IOException;
    List<ListDTO> findAll();
    RespDTO DetailContract(String contractCode) throws IOException;
    ResponseEntity<Resource> loadFile(String contractCode) throws IOException;
    List<ListDTO> searchAndFilter(String search, String filter);
}
