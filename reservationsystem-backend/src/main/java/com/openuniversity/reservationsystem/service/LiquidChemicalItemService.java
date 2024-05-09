package com.openuniversity.reservationsystem.service;

import com.openuniversity.reservationsystem.model.LabEquipmentItems;
import com.openuniversity.reservationsystem.model.LiquidChemicalItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface LiquidChemicalItemService {

    LiquidChemicalItems addLiquidChemicalItems(LiquidChemicalItems liquidChemicalItems) throws Exception;

    void deleteLiquidChemicalItem(Long id) throws Exception;

    LiquidChemicalItems getLiquidChemicalItemById (Long id) throws Exception;

}
