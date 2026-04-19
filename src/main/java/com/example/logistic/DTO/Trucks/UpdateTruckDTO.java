package com.example.logistic.DTO.Trucks;

import java.util.List;

public class UpdateTruckDTO {
   private List<TruckItemDTO> trucks;

    public UpdateTruckDTO() {
    }

    public List<TruckItemDTO> getTrucks() {
        return trucks;
    }

    public void setTrucks(List<TruckItemDTO> trucks) {
        this.trucks = trucks;
    }
}
