package com.example.logistic.DTO.Declarations;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class DeclarationDTO {
    private String declarationCode;
    private  String declarationNumber;
    private String lane;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate declarationDate;
    private String customsBranch;

    public DeclarationDTO() {
    }

    public String getDeclarationCode() {
        return declarationCode;
    }

    public void setDeclarationCode(String declarationCode) {
        this.declarationCode = declarationCode;
    }

    public String getDeclarationNumber() {
        return declarationNumber;
    }

    public void setDeclarationNumber(String declarationNumber) {
        this.declarationNumber = declarationNumber;
    }

    public String getLane() {
        return lane;
    }

    public void setLane(String lane) {
        this.lane = lane;
    }

    public LocalDate getDeclarationDate() {
        return declarationDate;
    }

    public void setDeclarationDate(LocalDate declarationDate) {
        this.declarationDate = declarationDate;
    }

    public String getCustomsBranch() {
        return customsBranch;
    }

    public void setCustomsBranch(String customsBranch) {
        this.customsBranch = customsBranch;
    }
}
