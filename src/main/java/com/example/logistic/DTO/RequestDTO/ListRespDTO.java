package com.example.logistic.DTO.RequestDTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class ListRespDTO {
    private String requestCode;
    private String companyName;
    private String contactName;
    private String contactPhone;
    private String customerEmail;

    private String status;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    public ListRespDTO() {
    }

    public ListRespDTO(String requestCode, String companyName, String contactName, String contactPhone, String customerEmail, String status, LocalDate createdAt) {
        this.requestCode = requestCode;
        this.companyName = companyName;
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.customerEmail = customerEmail;

        this.status = status;
        this.createdAt = createdAt;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(String requestCode) {
        this.requestCode = requestCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
