package com.example.logistic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="invoices")
public class Invoices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="shipment_id")
    private Shipments shipment;

    @ManyToOne
    @JoinColumn(name="customer_id")
    private Customers customer;

    @Column(name = "invoice_code", insertable = false, updatable = false)
    private String invoiceCode;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "total_amount")
    private double totalAmount;


    @Column(name = "status")
    private String status;

    @Column(name = "issue_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate issueDate;

    public Invoices() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Shipments getShipment() {
        return shipment;
    }

    public void setShipment(Shipments shipment) {
        this.shipment = shipment;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }
}
