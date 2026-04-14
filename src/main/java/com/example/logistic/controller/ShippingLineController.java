package com.example.logistic.controller;

import com.example.logistic.DTO.ShippingLineDTO.CreateDTO;
import com.example.logistic.DTO.ShippingLineDTO.ListDTO;
import com.example.logistic.service.IShippingLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipping")
@CrossOrigin("*")
public class ShippingLineController {
    @Autowired
    private IShippingLineService shippingLineService;

    @GetMapping("")
    public List<ListDTO> showList(@RequestParam (value="search",required = false)String search){
        if(search == null ||search.isEmpty()){
            return shippingLineService.findAll();
        }
        return shippingLineService.findByName(search);
    }

    @GetMapping("/{shippingCode}")
    public ListDTO detailShipping(@RequestParam ("shippingCode") String shippingCode ){
        return shippingLineService.detailShipping(shippingCode);
    }

    @PostMapping("/create")
    public ResponseEntity<ListDTO> createShipping(@RequestBody CreateDTO dto){
        return ResponseEntity.ok(shippingLineService.createShipping(dto));
    }

    @PutMapping("/update/{shippingCode}")
    public ResponseEntity<ListDTO> updateShipping(@RequestParam ("shippingCode")String shippingCode, @RequestBody ListDTO dto){
        return ResponseEntity.ok(shippingLineService.updateShipping(shippingCode,dto));

    }

}
