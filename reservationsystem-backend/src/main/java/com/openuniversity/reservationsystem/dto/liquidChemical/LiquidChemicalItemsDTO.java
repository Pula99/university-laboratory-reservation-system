package com.openuniversity.reservationsystem.dto.liquidChemical;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LiquidChemicalItemsDTO {

    private String chemicalName;
    private Integer litre;

}
