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


    @Column(name = "status")
    private String status;
    @Column(name = "booking_number") // so tau
    private String bookingNumber;
    @Column(name = "vessel_name") // ten tau
    private String vesselName;

    @Column(name = "port_of_loading") // cang di
    private String portOfLoading;
    @Column(name = "port_of_discharge") // cang den
    private String portOfDischarge ;

    public VesselBookings() {
    }

    public String getBookingNumber() {
        return bookingNumber;
    }

    public void setBookingNumber(String bookingNumber) {
        this.bookingNumber = bookingNumber;
    }

    public String getVesselName() {
        return vesselName;
    }

    public void setVesselName(String vesselName) {
        this.vesselName = vesselName;
    }

    public String getPortOfLoading() {
        return portOfLoading;
    }

    public void setPortOfLoading(String portOfLoading) {
        this.portOfLoading = portOfLoading;
    }

    public String getPortOfDischarge() {
        return portOfDischarge;
    }

    public void setPortOfDischarge(String portOfDischarge) {
        this.portOfDischarge = portOfDischarge;
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


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
