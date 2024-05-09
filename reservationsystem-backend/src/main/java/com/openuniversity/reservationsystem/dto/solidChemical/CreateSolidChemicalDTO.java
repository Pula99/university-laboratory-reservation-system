package com.openuniversity.reservationsystem.dto.solidChemical;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSolidChemicalDTO {

    @NotBlank(message = "Chemical Name should not be empty")
    private String chemicalName;

    @NotBlank(message = "Chemical Common Name should not be empty")
    private String chemicalCommonName;

    @NotBlank(message = "Chemical Fomula should not be empty")
    private String chemicalFormula;

    @NotBlank(message = "Chemical Properties should not be empty")
    private String chemicalProperties;

    @NotBlank(message = "Chemical Hazard should not be empty")
    private String chemicalHazard;

    @NotBlank(message = "Storage Condition should not be empty")
    private String storageCondition;

    @NotBlank(message = "Safety Data Sheet should not be empty")
    private String safetyDataSheet;

    @NotBlank(message = "Purchase Date Name should not be empty")
    private LocalDate purchaseDate;

    @NotBlank(message = "Expire Date should not be empty")
    private LocalDate expireDate;

    @NotNull(message = "Available Quantity Name should not be empty")
    private Long availableQuantityinGrams;
}
