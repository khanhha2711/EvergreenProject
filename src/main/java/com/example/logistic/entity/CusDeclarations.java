package com.example.logistic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table (name="customs_declarations")
public class CusDeclarations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="shipment_id")
    private Shipments shipment;

    @Column(name = "declaration_code", insertable = false, updatable = false)
    private String declarationCode;

    @Column(name = "declaration_number")
    private String declarationNumber;

    @Column(name = "lane")
    private String lane;

    @Column(name = "status")
    private String status;

    @Column(name = "declaration_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate declarationDate;

    @Column(name = "attachment")
    private String attachment;
    public CusDeclarations() {
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

    public Shipments getShipment() {
        return shipment;
    }

    public void setShipment(Shipments shipment) {
        this.shipment = shipment;
    }

    public String getDeclarationCode() {
        return declarationCode;
    }

    public void setDeclarationCode(String declarationCode) {
        this.declarationCode = declarationCode;
    }

    public String getDeclarationNumber() {
        return declarationNumber;
    }

    public void setDeclarationNumber(String declarationNumber) {
        this.declarationNumber = declarationNumber;
    }

    public String getLane() {
        return lane;
    }

    public void setLane(String lane) {
        this.lane = lane;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDeclarationDate() {
        return declarationDate;
    }

    public void setDeclarationDate(LocalDate declarationDate) {
        this.declarationDate = declarationDate;
    }
}
