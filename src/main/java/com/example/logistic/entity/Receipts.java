package com.example.logistic.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="receipts")
public class Receipts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="invoice_id")
    private Invoices invoices;

    @Column(name = "receipt_code", insertable = false, updatable = false)
    private String receiptCode;

    @Column(name = "receipt_number")
    private String receiptNumber;

    @Column(name = "amount")
    private double amount;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "receipt_date")
    private LocalDate receiptDate;

    public Receipts() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Invoices getInvoices() {
        return invoices;
    }

    public void setInvoices(Invoices invoices) {
        this.invoices = invoices;
    }

    public String getReceiptCode() {
        return receiptCode;
    }

    public void setReceiptCode(String receiptCode) {
        this.receiptCode = receiptCode;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(LocalDate receiptDate) {
        this.receiptDate = receiptDate;
    }
}
