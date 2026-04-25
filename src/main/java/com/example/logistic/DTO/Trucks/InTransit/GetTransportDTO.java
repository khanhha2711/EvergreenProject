package com.example.logistic.DTO.Trucks.InTransit;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class GetTransportDTO {
    // tra last his, vi tri cua khach hang( shipment) , vi tri cua truckcomapy(first his), bien so xe
    private String location;//truckStatus ..
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateAt; // truckstatus

    // Last his
    private Double latiNow;
    private Double lonNow;

    // First his - Company

    private String companyAddress;
    private Double latiCom;
    private Double lonCom;

    // Khach hang
    private String customerAddress;
    private Double latiCus;
    private Double lonCus;

    // cang
    private String origin;
    private Double latiOrigin;
    private Double lonOrigin;


    private String licensePlate;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public Double getLatiNow() {
        return latiNow;
    }

    public void setLatiNow(Double latiNow) {
        this.latiNow = latiNow;
    }

    public Double getLonNow() {
        return lonNow;
    }

    public void setLonNow(Double lonNow) {
        this.lonNow = lonNow;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public Double getLatiCom() {
        return latiCom;
    }

    public void setLatiCom(Double latiCom) {
        this.latiCom = latiCom;
    }

    public Double getLonCom() {
        return lonCom;
    }

    public void setLonCom(Double lonCom) {
        this.lonCom = lonCom;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public Double getLatiCus() {
        return latiCus;
    }

    public void setLatiCus(Double latiCus) {
        this.latiCus = latiCus;
    }

    public Double getLonCus() {
        return lonCus;
    }

    public void setLonCus(Double lonCus) {
        this.lonCus = lonCus;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Double getLatiOrigin() {
        return latiOrigin;
    }

    public void setLatiOrigin(Double latiOrigin) {
        this.latiOrigin = latiOrigin;
    }

    public Double getLonOrigin() {
        return lonOrigin;
    }

    public void setLonOrigin(Double lonOrigin) {
        this.lonOrigin = lonOrigin;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }
}
