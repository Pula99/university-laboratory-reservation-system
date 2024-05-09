package com.openuniversity.reservationsystem.dto.solidChemical;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolidChemicalItemsDTO {

    private String chemicalName;
    private Integer grams;

}
