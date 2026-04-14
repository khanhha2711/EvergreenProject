package com.example.logistic.controller;

import com.example.logistic.DTO.ShipmentDTO.ListDTO;
import com.example.logistic.DTO.ShipmentDTO.Page1DTO.InformationDTO;
import com.example.logistic.service.IShipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipments")
@CrossOrigin("*")
public class ShipmentController {
    @Autowired
    private IShipmentService shipmentService;

    @GetMapping("")
    public List<ListDTO> showList(@RequestParam(name="search",required = false)String search,
                                  @RequestParam (name="filter",required = false) String filter){
        boolean isSearchEmpty = (search == null || search.isEmpty());
        boolean isFilterEmpty = (filter == null || filter.isEmpty());

        if ((isSearchEmpty && isFilterEmpty)) {
            return shipmentService.findAll();
        }
        return shipmentService.searchAndFilter(search, filter);
    }

    @GetMapping("/{shipmentCode}")
    public InformationDTO detailShipment(@PathVariable ("shipmentCode") String shipmentCode){
        return shipmentService.detailInfor(shipmentCode);
    }
}
