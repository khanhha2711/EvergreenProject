package com.example.logistic.DTO.Contracts;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class ListDTO {
    private  String contractCode;
    private String quotationCode;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate signedDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate expiredDate;
    private String contractStatus;

    public ListDTO() {
    }

    public String getContractCode() {
        return contractCode;
    }

    public void setContractCode(String contractCode) {
        this.contractCode = contractCode;
    }

    public String getQuotationCode() {
        return quotationCode;
    }

    public void setQuotationCode(String quotationCode) {
        this.quotationCode = quotationCode;
    }

    public LocalDate getSignedDate() {
        return signedDate;
    }

    public void setSignedDate(LocalDate signedDate) {
        this.signedDate = signedDate;
    }

    public LocalDate getExpiredDate() {
        return expiredDate;
    }

    public void setExpiredDate(LocalDate expiredDate) {
        this.expiredDate = expiredDate;
    }

    public String getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(String contractStatus) {
        this.contractStatus = contractStatus;
    }
}
