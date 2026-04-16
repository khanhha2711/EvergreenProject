package com.example.logistic.DTO.ShipmentDTO.Page1DTO;

import com.example.logistic.DTO.CustomerDTO.UpdateDTO;
import com.example.logistic.DTO.RequestDTO.ActivityDTO;
import com.example.logistic.DTO.RequestDTO.CargoDTO;
import com.example.logistic.entity.Services;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

public class InformationDTO {
    private UpdateDTO customer;
    private ActivityDTO activity;
    private String origin;
    private String destination;
    private CargoDTO cargo;
    private String shipmentCode;
    private String contractCode;
    private List<String> service;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate departureDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    private LocalDate estimatedArrival;

    public InformationDTO() {
    }


    public ActivityDTO getActivity() {
        return activity;
    }

    public void setActivity(ActivityDTO activity) {
        this.activity = activity;
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

    public UpdateDTO getCustomer() {
        return customer;
    }

    public void setCustomer(UpdateDTO customer) {
        this.customer = customer;
    }

    public CargoDTO getCargo() {
        return cargo;
    }

    public void setCargo(CargoDTO cargo) {
        this.cargo = cargo;
    }

    public String getShipmentCode() {
        return shipmentCode;
    }

    public void setShipmentCode(String shipmentCode) {
        this.shipmentCode = shipmentCode;
    }

    public String getContractCode() {
        return contractCode;
    }

    public void setContractCode(String contractCode) {
        this.contractCode = contractCode;
    }


    public List<String> getService() {
        return service;
    }

    public void setService(List<String> service) {
        this.service = service;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
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
}
