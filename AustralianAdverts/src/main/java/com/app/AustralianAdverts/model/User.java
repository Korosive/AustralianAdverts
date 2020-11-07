package com.app.AustralianAdverts.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID user_id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "date_created")
    private Date date_created;

    public User(UUID user_id, String email, String username, String password, Date date_created) {
        this.user_id = user_id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.date_created = date_created;
    }

    public UUID getUser_id() {
        return user_id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Date getDate_created() {
        return date_created;
    }
}
