package com.example.logistic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name="contracts")
public class Contracts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "contract_code", insertable = false, updatable = false)
    @org.hibernate.annotations.Generated(org.hibernate.annotations.GenerationTime.INSERT)
    private String contractCode;

    @Column(name = "contract_name")
    private String contractName;

    @ManyToOne
    @JoinColumn(name="quotation_id")
    private Quotations quotations;
    @Column(name = "signed_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate signedDate;
    @Column(name = "expired_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate expiredDate;
    @Column(name = "contract_status")
    private String contractStatus;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    @Column(name="attachment")
    private String attachment;

    public Contracts() {
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContractCode() {
        return contractCode;
    }

    public void setContractCode(String contractCode) {
        this.contractCode = contractCode;
    }

    public Quotations getQuotations() {
        return quotations;
    }

    public void setQuotations(Quotations quotations) {
        this.quotations = quotations;
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

    public String getContractName() {
        return contractName;
    }

    public void setContractName(String contractName) {
        this.contractName = contractName;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
