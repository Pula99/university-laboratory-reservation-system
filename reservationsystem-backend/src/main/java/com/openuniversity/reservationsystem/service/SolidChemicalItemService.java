package com.openuniversity.reservationsystem.service;

import com.openuniversity.reservationsystem.model.SolidChemicalItems;
import org.springframework.stereotype.Service;

@Service
public interface SolidChemicalItemService {

    SolidChemicalItems addSolidChemicalItems(SolidChemicalItems solidChemicalItems) throws Exception;

    void deleteSolidChemicalItem(Long id) throws Exception;
}
