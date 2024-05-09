package com.openuniversity.reservationsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class LabEquipmentItems {

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation; // Reference to Reservation entity

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String  equipmentName;
    private Integer quantity;




}
