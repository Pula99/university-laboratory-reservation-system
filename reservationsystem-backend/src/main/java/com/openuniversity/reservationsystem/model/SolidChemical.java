package com.openuniversity.reservationsystem.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "solid_chemicals")
public class SolidChemical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String chemicalName;
    private String chemicalCommonName;
    private String chemicalFormula;
    private String chemicalProperties;
    private String chemicalHazard;
    private String storageCondition;
    private String safetyDataSheet;
    private LocalDate purchaseDate;
    private LocalDate expireDate;
    private Long availableQuantityinGrams;

}
