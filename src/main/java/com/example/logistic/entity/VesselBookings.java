package com.example.logistic.entity;

import jakarta.persistence.*;

@Entity
@Table(name="vessel_bookings")
public class VesselBookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="shipment_id")
    private Shipments shipment;

    @ManyToOne
    @JoinColumn(name="shipping_line_id")
    private ShippingLines shippingLine;

    @Column(name = "booking_code", insertable = false, updatable = false)
    private String bookingCode;

    @Column(name = "internal_cost")
    private double internalCost;

    @Column(name = "status")
    private String status;

    public VesselBookings() {
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

    public ShippingLines getShippingLine() {
        return shippingLine;
    }

    public void setShippingLine(ShippingLines shippingLine) {
        this.shippingLine = shippingLine;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }

    public double getInternalCost() {
        return internalCost;
    }

    public void setInternalCost(double internalCost) {
        this.internalCost = internalCost;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
