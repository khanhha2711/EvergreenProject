package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="quotation_details")
public class QuotationDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="quotation_id")
    private Quotations quotation;
    @ManyToOne
    @JoinColumn(name="service_id")
    private Services service;


    @Column(name = "quantity")
    private int quantity;


    public QuotationDetail() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Quotations getQuotation() {
        return quotation;
    }

    public void setQuotation(Quotations quotation) {
        this.quotation = quotation;
    }

    public Services getService() {
        return service;
    }

    public void setService(Services service) {
        this.service = service;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


}
