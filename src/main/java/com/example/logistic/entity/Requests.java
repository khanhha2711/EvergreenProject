package com.example.logistic.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="requests")
public class Requests {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "request_code", insertable = false, updatable = false)
    private String requestCode;

    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ServiceDetail> requestServices = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="customer_id")
    private Customers customer;

    @Column(name="cargo_name")
    private String cargoName;

    @Column(name="cargo_category")
    private String cargoCategory;

    @Column(name="gross_weight")
    private double grossWeight;

    @Column(name="package_count")
    private int packageCount;

    @Column(name="quantity_container")
    private int quantityContainer;

    @Column(name="container_type")
    private String containerType;

    @Column(name="cargo_value")
    private double cargoValue;

    @Column(name="incoterm")
    private String incoterm;

    public List<ServiceDetail> getRequestServices() {
        return requestServices;
    }


    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;

    public Requests() {
    }


    public String getContainerType() {
        return containerType;
    }

    public void setContainerType(String containerType) {
        this.containerType = containerType;
    }

    public void setRequestServices(List<ServiceDetail> requestServices) {
        this.requestServices = requestServices;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(String requestCode) {
        this.requestCode = requestCode;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public String getCargoName() {
        return cargoName;
    }

    public void setCargoName(String cargoName) {
        this.cargoName = cargoName;
    }

    public String getCargoCategory() {
        return cargoCategory;
    }

    public void setCargoCategory(String cargoCategory) {
        this.cargoCategory = cargoCategory;
    }

    public double getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(double grossWeight) {
        this.grossWeight = grossWeight;
    }

    public int getPackageCount() {
        return packageCount;
    }

    public void setPackageCount(int packageCount) {
        this.packageCount = packageCount;
    }

    public int getQuantityContainer() {
        return quantityContainer;
    }

    public void setQuantityContainer(int quantityContainer) {
        this.quantityContainer = quantityContainer;
    }

    public double getCargoValue() {
        return cargoValue;
    }

    public void setCargoValue(double cargoValue) {
        this.cargoValue = cargoValue;
    }


    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
