package com.example.logistic.DTO.CustomerDTO;

public class ListDTO {
    private String customerCode;
    private String companyName;
    private String contactName;
    private String contactPhone;
    private String customerEmail;
    private String customerAddress;

    public ListDTO() {
    }

    public ListDTO(String customerCode, String companyName, String contactName, String contactPhone, String customerEmail, String customerAddress) {
        this.customerCode = customerCode;
        this.companyName = companyName;
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.customerEmail = customerEmail;
        this.customerAddress = customerAddress;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
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

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }
}
