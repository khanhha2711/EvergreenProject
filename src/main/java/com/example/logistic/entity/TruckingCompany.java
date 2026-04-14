package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="trucking_companies")
public class TruckingCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "company_code", insertable = false, updatable = false)
    @org.hibernate.annotations.Generated(org.hibernate.annotations.GenerationTime.INSERT)
    private String companyCode;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_phone")
    private String companyPhone;

    @Column(name = "company_address")
    private String companyAddress;

    @Column(name = "company_gmail")
    private String companyGmail;

    public TruckingCompany() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
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
