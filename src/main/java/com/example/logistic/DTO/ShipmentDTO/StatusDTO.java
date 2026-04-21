package com.example.logistic.DTO.ShipmentDTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class StatusDTO {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd HH:mm:ss")
    private LocalDateTime createdAt;
    private String status;

    public StatusDTO() {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
