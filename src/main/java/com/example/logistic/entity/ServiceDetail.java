package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="request_services")
public class ServiceDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name="request_id")
    private Requests request;

    @ManyToOne
    @JoinColumn(name="service_id")
    private Services service;

    public ServiceDetail() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Requests getRequest() {
        return request;
    }

    public void setRequest(Requests request) {
        this.request = request;
    }

    public Services getService() {
        return service;
    }

    public void setService(Services service) {
        this.service = service;
    }
}
