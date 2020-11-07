package com.app.AustralianAdverts.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "adverts")
public class Advert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID advert_id;

    @Column(name = "user_id")
    private UUID user_id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "start_date")
    private Date start_date;

    @Column(name = "end_date")
    private Date end_date;

    @Column(name = "date_created")
    private Date date_created;

    //Status of advert: Draft, Live, Completed, In Progress, Withdrawn
    @Column(name = "status")
    private String status;

    //Payment amount for advert
    @Column(name = "payment")
    private double payment;

    //Whether user has paid to place advert (non-paid status of advert = Draft)
    @Column(name = "paid")
    private boolean paid;

    public Advert(UUID advert_id, UUID user_id, String title, String description, Date start_date, Date end_date, Date date_created, String status, double payment, boolean paid) {
        this.advert_id = advert_id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.date_created = date_created;
        this.status = status;
        this.payment = payment;
        this.paid = paid;
    }

    public UUID getAdvert_id() {
        return advert_id;
    }

    public UUID getUser_id() {
        return user_id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Date getStart_date() {
        return start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public Date getDate_created() {
        return date_created;
    }

    public String getStatus() {
        return status;
    }

    public double getPayment() {
        return payment;
    }

    public boolean isPaid() {
        return paid;
    }
}
