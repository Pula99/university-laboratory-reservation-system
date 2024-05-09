package com.openuniversity.reservationsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SolidChemicalItems {

    @ManyToOne
    @JoinColumn(name = "reservation_id") // Name of the foreign key column in LabEquipmentItems table
    private Reservation reservation; // Reference to Reservation entity

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String chemicalName;
    private Integer grams;




}
