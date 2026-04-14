package com.example.logistic.DTO.RequestDTO;

public class CreateRequestDTO {
    private CargoDTO cargo;
    private CustomerDTO customer;
    private TransportDTO transport;

    public CreateRequestDTO() {
    }

    public CargoDTO getCargo() {
        return cargo;
    }

    public void setCargo(CargoDTO cargo) {
        this.cargo = cargo;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }

    public TransportDTO getTransport() {
        return transport;
    }

    public void setTransport(TransportDTO transport) {
        this.transport = transport;
    }
}
