package com.example.logistic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
@Table(name="shipments")
public class Shipments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id;
    @Column(name = "shipment_code", insertable = false, updatable = false)
    private String shipmentCode;
    @ManyToOne
    @JoinColumn(name="contract_id")
    private Contracts contract;
    @ManyToOne
    @JoinColumn(name="cargo_id")
    private Cargo cargo;

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @Column(name = "departure_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate departureDate;

    @Column(name = "estimated_arrival")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate estimatedArrival;


    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    @Column(name = "shipment_direction")
    private String direction;

    public Shipments() {
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public LocalDate getEstimatedArrival() {
        return estimatedArrival;
    }

    public void setEstimatedArrival(LocalDate estimatedArrival) {
        this.estimatedArrival = estimatedArrival;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getShipmentCode() {
        return shipmentCode;
    }

    public void setShipmentCode(String shipmentCode) {
        this.shipmentCode = shipmentCode;
    }


    public Contracts getContract() {
        return contract;
    }

    public void setContract(Contracts contract) {
        this.contract = contract;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }
}
