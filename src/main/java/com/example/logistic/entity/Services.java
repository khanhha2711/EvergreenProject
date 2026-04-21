package com.example.logistic.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="services")
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "service_code", insertable = false, updatable = false)
    @org.hibernate.annotations.Generated(org.hibernate.annotations.GenerationTime.INSERT)
    private String serviceCode;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<ServiceDetail> requestServices;

    @Column(name = "service_name")
    private String serviceName;
    @Column(name = "unit")
    private String unit;

    @Column(name = "status")
    private String status;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private double price;
    @Column(name = "capacity")
    private int capacity;

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Services() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ServiceDetail> getRequestServices() {
        return requestServices;
    }

    public void setRequestServices(List<ServiceDetail> requestServices) {
        this.requestServices = requestServices;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }


    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
