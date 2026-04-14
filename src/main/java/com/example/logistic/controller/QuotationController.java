package com.example.logistic.controller;

import com.example.logistic.DTO.QuotationDTO.*;
import com.example.logistic.entity.Quotations;
import com.example.logistic.service.IQuotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quotations")
@CrossOrigin("*")
public class QuotationController {
    @Autowired
    private IQuotationService quotationService;

    @GetMapping("")
    public List<ListQuoDTO> showList( @RequestParam (name="search",required = false)String search,
                                      @RequestParam (name="filter",required = false) String filter){
        boolean isSearchEmpty = (search == null || search.isEmpty());
        boolean isFilterEmpty = (filter == null || filter.isEmpty());

        if ((isSearchEmpty && isFilterEmpty)) {
            //all
            return quotationService.findAll();
        }
        // loc + search
        return quotationService.searchAndFilter(search, filter);

    }

    @PostMapping("/create")
    public QuotationResponseDTO createQuotation(@RequestBody CreateQuotationDTO dto)
    {
        return quotationService.createQuotation(dto.getRequestCode(),dto.getEmployeeCode());
    }

    @GetMapping("/{quotationCode}")
    public QuotationResponseDTO detailQuotation(@PathVariable("quotationCode") String quotationCode){
        return quotationService.detailQuotation(quotationCode);
    }


    @PutMapping("/update")
    public ResponseEntity<String> updateStatus(@RequestBody UpdateStatusDTO dto){
        quotationService.updateStatus(dto.getQuotationCode(),dto.getStatus());
        return ResponseEntity.ok("Status updated successfully");

    }

    @PutMapping("/update/{quotationCode}")
    public ResponseEntity<QuotationResponseDTO> updateQuotation( @PathVariable ("quotationCode") String quotationCode, @RequestBody UpdateQuotationDTO dto)
    {
        quotationService.updateQuotation(quotationCode,dto);
        QuotationResponseDTO response = quotationService.detailQuotation(quotationCode);
        return ResponseEntity.ok(response);
    }
}
