package com.openuniversity.reservationsystem.dto.labEquipment;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateLabEquipmentDTO {

    @NotBlank(message = "Equipment Name should not be empty")
    private String equipmentName;

    @NotBlank(message = "Equipment Type should not be empty")
    private String equipmentType;

    @NotBlank(message = "Equipment Description should not be empty")
    private String equipmentDescription;

    @NotBlank(message = "Equipment Instruction should not be empty")
    private String equipmentInstruction;

    @NotBlank(message = "Equipment Quantity should not be empty")
    private Long availableQuantity;
}
