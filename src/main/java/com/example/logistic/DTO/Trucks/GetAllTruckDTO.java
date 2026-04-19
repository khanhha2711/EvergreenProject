package com.example.logistic.DTO.Trucks;

import java.util.List;

public class GetAllTruckDTO {
    private String companyName;
    private List<TruckItemDTO> trucks;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public List<TruckItemDTO> getTrucks() {
        return trucks;
    }

    public void setTrucks(List<TruckItemDTO> trucks) {
        this.trucks = trucks;
    }
}
