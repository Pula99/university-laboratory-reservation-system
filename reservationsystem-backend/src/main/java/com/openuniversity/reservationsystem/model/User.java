package com.openuniversity.reservationsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name = "userlist")
public class User {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String password;
    private String email;
    private String role;


}
