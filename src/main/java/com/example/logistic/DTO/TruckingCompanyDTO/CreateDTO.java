package com.example.logistic.DTO.TruckingCompanyDTO;

public class CreateDTO {
    private String companyName;
    private String companyPhone;
    private String companyAddress;
    private String companyGmail;

    public CreateDTO() {
    }


    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyPhone() {
        return companyPhone;
    }

    public void setCompanyPhone(String companyPhone) {
        this.companyPhone = companyPhone;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public String getCompanyGmail() {
        return companyGmail;
    }

    public void setCompanyGmail(String companyGmail) {
        this.companyGmail = companyGmail;
    }
}
