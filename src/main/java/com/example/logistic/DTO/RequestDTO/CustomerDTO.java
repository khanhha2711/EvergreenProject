package com.example.logistic.DTO.RequestDTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CustomerDTO {
    @JsonProperty("companyName")
    private String companyName;
    @JsonProperty("contactName")
    private String contactName;
    @JsonProperty("contactPhone")
    private String phone;
    @JsonProperty("customerEmail")
    private String email;
    @JsonProperty("customerAddress")
    private String customerAddress;
    @JsonProperty("taxCode")
    private String taxCode;
    @JsonProperty("service")
    private List<String> service;

    public CustomerDTO() {
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public List<String> getService() {
        return service;
    }

    public void setService(List<String> service) {
        this.service = service;
    }
}
