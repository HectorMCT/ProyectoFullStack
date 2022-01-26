package com.hector.rentcar.model;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "rent")
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rental_id")
    private Integer rental_id;
    @Column(name = "VIN", nullable = false, updatable = false)
    @NotBlank(message = "Please ingress the VIN car you want to rent.")
    private String vin;
    @Column(name = "client_id", nullable = false, updatable = false)
    @NotBlank(message = "Please ingress your Email.")
    private String client_id;
    private Double totalAmount;
    @Column(name = "rentalDate", nullable = false, updatable = false)
    private Date rentalDate;
    @Column(name = "returnDate", nullable = false)
    private Date returnDate;
    private Boolean status;

    public Rent() {

    }

    public Rent(String vin, String client_id, Double totalAmount, Date rentalDate, Date returnDate, Boolean status) {
        this.vin = vin;
        this.client_id = client_id;
        this.totalAmount = totalAmount;
        this.rentalDate = rentalDate;
        this.returnDate = returnDate;
        this.status = status;
    }

    public Integer getRental_id() {
        return rental_id;
    }

    public void setRental_id(Integer rental_id) {
        this.rental_id = rental_id;
    }

    public String getVIN() {
        return vin;
    }

    public void setVIN(String vin) {
        this.vin = vin;
    }

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Date getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(Date rentalDate) {
        this.rentalDate = rentalDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public Boolean getStatu() {
        return status;
    }

    public void setStatu(Boolean statu) {
        this.status = statu;
    }

    @Override
    public String toString() {
        return "Rent{" +
                "rental_id=" + rental_id +
                ", VIN='" + vin + '\'' +
                ", client_id='" + client_id + '\'' +
                ", totalAmount=" + totalAmount +
                ", rentalDate=" + rentalDate +
                ", returnDate=" + returnDate +
                ", status=" + status +
                '}';
    }
}

