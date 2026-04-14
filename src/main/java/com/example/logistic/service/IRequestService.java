package com.example.logistic.service;

import com.example.logistic.DTO.RequestDTO.CreateRequestDTO;
import com.example.logistic.DTO.RequestDTO.ListRespDTO;
import com.example.logistic.DTO.RequestDTO.RequestResponeDTO;
import com.example.logistic.entity.Requests;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IRequestService {

   List<ListRespDTO> findAll();
   ListRespDTO createRequest(CreateRequestDTO requestDTO);
   RequestResponeDTO detailRequest(String requestCode);
   ResponseEntity<String> deleteRequest(String requestCode);
   List<ListRespDTO> search(String phone);

}
