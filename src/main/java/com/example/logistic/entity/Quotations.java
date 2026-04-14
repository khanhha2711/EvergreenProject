package com.example.logistic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="quotations")
public class Quotations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "quotation_code", insertable = false, updatable = false)
    private String quotationCode;

    @ManyToOne
    @JoinColumn(name="request_id")
    private Requests request;
    @ManyToOne
    @JoinColumn(name="employee_id")
    private Employees employee;

    @Column(name = "total_price")
    private double totalPrice;
    @Column(name = "status")
    private String status;
    @Column(name = "version")
    private int version;
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    @OneToMany(mappedBy = "quotation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuotationDetail> quotationDetails;
    public Quotations() {
    }

    public List<QuotationDetail> getQuotationDetails() {
        return quotationDetails;
    }

    public void setQuotationDetails(List<QuotationDetail> quotationDetails) {
        this.quotationDetails = quotationDetails;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuotationCode() {
        return quotationCode;
    }

    public void setQuotationCode(String quotationCode) {
        this.quotationCode = quotationCode;
    }

    public Requests getRequest() {
        return request;
    }

    public void setRequest(Requests request) {
        this.request = request;
    }

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
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

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}

