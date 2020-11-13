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

    @Column(name = "date_created")
    private Date date_created;

    @Column(name = "primary_contact_method")
    private String primary_contact_method;

    @Column(name = "primary_contact_info")
    private String primary_contact_info;

    public Advert(UUID advert_id, UUID user_id, String title, String description, Date date_created, String primary_contact_method, String primary_contact_info) {
        this.advert_id = advert_id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.date_created = date_created;
        this.primary_contact_method = primary_contact_method;
        this.primary_contact_info = primary_contact_info;
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

    public Date getDate_created() {
        return date_created;
    }

    public String getPrimary_contact_method() {
        return primary_contact_method;
    }

    public String getPrimary_contact_info() {
        return primary_contact_info;
    }
}
