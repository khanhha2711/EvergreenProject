package com.example.logistic.DTO.RequestDTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

public class RequestResponeDTO {
    private String requestCode;
    private String companyName;
    private String contactName;
    private String contactPhone;
    private String customerEmail;
    private String customerAddress;
    private String taxCode;
    private String status;

    private String cargoName;
    private String cargoCategory;
    private Double grossWeight;
    private Integer packageCount;
    private Integer quantityContainer;
    private Double cargoValue;

    private String incoterm;
    private String origin;
    private String destination;
    private String containerType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate createdAt;
    private List<String> serviceCode;

    public RequestResponeDTO() {
    }

    public String getContainerType() {
        return containerType;
    }

    public void setContainerType(String containerType) {
        this.containerType = containerType;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
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

    public Double getGrossWeight() {
        return grossWeight;
    }

    public void setGrossWeight(Double grossWeight) {
        this.grossWeight = grossWeight;
    }

    public Integer getPackageCount() {
        return packageCount;
    }

    public void setPackageCount(Integer packageCount) {
        this.packageCount = packageCount;
    }

    public Integer getQuantityContainer() {
        return quantityContainer;
    }

    public void setQuantityContainer(Integer quantityContainer) {
        this.quantityContainer = quantityContainer;
    }

    public Double getCargoValue() {
        return cargoValue;
    }

    public void setCargoValue(Double cargoValue) {
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


    public List<String> getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(List<String> serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getRequestCode() {
        return requestCode;
    }

    public void setRequestCode(String requestCode) {
        this.requestCode = requestCode;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}
