package com.openuniversity.reservationsystem.dto.labEquipment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabEquipmentDTO {

    private String equipmentName;
    private String equipmentType;
    private String equipmentDescription;
    private String equipmentInstruction;
    private Long availableQuantity;

}
