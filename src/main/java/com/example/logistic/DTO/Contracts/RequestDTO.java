package com.example.logistic.DTO.Contracts;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

public class RequestDTO {
    private String quotationCode;
    private String contractName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate signedDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate expiredDate;

    public RequestDTO() {
    }

    public String getContractName() {
        return contractName;
    }

    public void setContractName(String contractName) {
        this.contractName = contractName;
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
}

