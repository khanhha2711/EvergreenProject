package com.example.logistic.DTO.QuotationDTO;

import com.example.logistic.DTO.RequestDTO.*;

import java.util.List;

public class QuotationResponseDTO {
    private String id;         // BG001
    private String status;
    private String createdAt;

    private CustomerDTO customer;
    private TransportDTO transportDTO;
    private CargoDTO cargo;

    private List<ItemDTO> items;
    private SummaryDTO summary;
    private List<ActivityDTO> activityLogs;

    public QuotationResponseDTO() {
    }

    public QuotationResponseDTO(String id, String status, String createdAt, CustomerDTO customer, TransportDTO transportDTO, CargoDTO cargo, List<ItemDTO> items, SummaryDTO summary, List<ActivityDTO> activityLogs) {
        this.id = id;
        this.status = status;
        this.createdAt = createdAt;
        this.customer = customer;
        this.transportDTO = transportDTO;
        this.cargo = cargo;
        this.items = items;
        this.summary = summary;
        this.activityLogs = activityLogs;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public TransportDTO getTransportDTO() {
        return transportDTO;
    }

    public void setTransportDTO(TransportDTO transportDTO) {
        this.transportDTO = transportDTO;
    }

    public CargoDTO getCargo() {
        return cargo;
    }

    public void setCargo(CargoDTO cargo) {
        this.cargo = cargo;
    }

    public List<ItemDTO> getItems() {
        return items;
    }

    public void setItems(List<ItemDTO> items) {
        this.items = items;
    }

    public SummaryDTO getSummary() {
        return summary;
    }

    public void setSummary(SummaryDTO summary) {
        this.summary = summary;
    }

    public List<ActivityDTO> getActivityLogs() {
        return activityLogs;
    }

    public void setActivityLogs(List<ActivityDTO> activityLogs) {
        this.activityLogs = activityLogs;
    }
}
