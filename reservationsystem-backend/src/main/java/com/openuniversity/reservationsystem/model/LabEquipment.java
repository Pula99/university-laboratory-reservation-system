package com.openuniversity.reservationsystem.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "lab_quipment")
public class LabEquipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String equipmentName;
    private String equipmentType;
    private String equipmentDescription;
    private String equipmentInstruction;
    private Long availableQuantity;
}
