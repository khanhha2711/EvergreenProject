package com.example.logistic.DTO.ShipmentDTO;

import com.example.logistic.DTO.Declarations.LaneAndLogDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class OverViewDTO {
    private String status;
    // cua shipment history
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate updatedAt; //nhu tren
    private LaneAndLogDTO dto;
    private List<TruckInforDTO> truckInforDTO;// lay log cuoi cung - khai bao -> lay cua logdeclaration
                                                    // van chuyen -> lay cua


    public List<TruckInforDTO> getTruckInforDTO() {

        return truckInforDTO;
    }

    public void setTruckInforDTO(List<TruckInforDTO> truckInforDTO) {
        this.truckInforDTO = truckInforDTO;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LaneAndLogDTO getDto() {
        return dto;
    }

    public void setDto(LaneAndLogDTO dto) {
        this.dto = dto;
    }
}
