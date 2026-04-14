package com.example.logistic.DTO.QuotationDTO;

import com.example.logistic.DTO.RequestDTO.ItemDTO;

import java.util.List;

public class UpdateQuotationDTO {
    private List<ItemDTO> data;

    public UpdateQuotationDTO() {
    }

    public List<ItemDTO> getData() {
        return data;
    }

    public void setData(List<ItemDTO> data) {
        this.data = data;
    }
}
