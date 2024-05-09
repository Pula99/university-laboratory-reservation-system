package com.openuniversity.reservationsystem.dto.reservation;


import com.openuniversity.reservationsystem.dto.labEquipment.LabEquipmentItemsDTO;
import com.openuniversity.reservationsystem.dto.liquidChemical.LiquidChemicalItemsDTO;
import com.openuniversity.reservationsystem.dto.solidChemical.SolidChemicalItemsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateReservationDTO {

        private  Long id;
        private String name;
        private String email;
        private String requestingCentre;
        private String orderDetails;
        private LocalDate orderDate;

        private List<LiquidChemicalItemsDTO> requestedLiquidChemicals;
        private List<SolidChemicalItemsDTO> requestedSolidChemicals;
        private List<LabEquipmentItemsDTO> requestedLabEquipments;

}
