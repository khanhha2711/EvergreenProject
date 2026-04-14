package com.example.logistic.controller;

import com.example.logistic.DTO.RequestDTO.CreateRequestDTO;
import com.example.logistic.DTO.RequestDTO.ListRespDTO;
import com.example.logistic.DTO.RequestDTO.RequestResponeDTO;
import com.example.logistic.entity.Requests;
import com.example.logistic.service.IRequestService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin("*")
public class RequestController {
    @Autowired
    private IRequestService requestService;

    @GetMapping("/list")
    public List<ListRespDTO> listRequest(
            @RequestParam(name="search" ,required = false) String search
    ) {
        // Nếu không có search thì trả hết
        if (search == null || search.isEmpty()) {
            return requestService.findAll();
        }

        // Nếu có search → lọc theo phone
        return requestService.search(search);
    }

    @PostMapping("/create")
    public ListRespDTO createRequest(@RequestBody CreateRequestDTO requestDTO) {
        return requestService.createRequest(requestDTO);

    }

    @GetMapping("/{requestCode}")
    public RequestResponeDTO detailRequest(@PathVariable("requestCode") String requestCode){
        return requestService.detailRequest(requestCode);// service Code
    }

    @DeleteMapping("/delete/{requestCode}")
    @Transactional
    public ResponseEntity<String> deleteRequest(@PathVariable ("requestCode") String requestCode){
        return requestService.deleteRequest(requestCode);
    }

//    @GetMapping ("")
//    public ResponseEntity<List<ListRespDTO>> searchByPhone(@RequestParam ("search") String phone){
//        return ResponseEntity.ok(requestService.search(phone));
//    }
}

//done
