package com.example.logistic.DTO.Declarations;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class LogDTO {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd HH:mm:ss")
    private LocalDateTime createdAt;
    private String description;

    public LogDTO() {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
