package com.example.logistic.DTO.CustomerDTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateDTO {
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

    public UpdateDTO() {
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
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
}
