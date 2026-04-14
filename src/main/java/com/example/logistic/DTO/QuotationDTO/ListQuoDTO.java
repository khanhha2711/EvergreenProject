package com.example.logistic.DTO.QuotationDTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class ListQuoDTO {
    private String quotationCode;
    private String  contactName;
    private String companyName;
    private String employeeName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    private double totalPrice;
    private String status;

    public ListQuoDTO() {
    }

    public ListQuoDTO(String quotationCode, String contactName, String companyName, String employeeName, LocalDate createdAt, double totalPrice, String status) {
        this.quotationCode = quotationCode;
        this.contactName = contactName;
        this.companyName = companyName;
        this.employeeName = employeeName;
        this.createdAt = createdAt;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getQuotationCode() {
        return quotationCode;
    }

    public void setQuotationCode(String quotationCode) {
        this.quotationCode = quotationCode;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
