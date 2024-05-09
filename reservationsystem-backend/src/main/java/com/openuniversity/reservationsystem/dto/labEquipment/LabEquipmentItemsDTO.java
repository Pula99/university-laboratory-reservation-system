package com.openuniversity.reservationsystem.dto.labEquipment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabEquipmentItemsDTO {

    private String equipmentName;
    private Integer quantity;

}
