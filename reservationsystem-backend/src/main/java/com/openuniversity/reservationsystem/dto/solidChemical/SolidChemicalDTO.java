package com.openuniversity.reservationsystem.dto.solidChemical;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolidChemicalDTO {

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
