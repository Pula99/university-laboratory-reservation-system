package com.openuniversity.reservationsystem.service;

import com.openuniversity.reservationsystem.dto.liquidChemical.LiquidChemicalDTO;
import com.openuniversity.reservationsystem.dto.solidChemical.SolidChemicalDTO;
import com.openuniversity.reservationsystem.model.LiquidChemical;
import com.openuniversity.reservationsystem.model.SolidChemical;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChemicalService {

    /////////////LiquidChemicals/////////////
    LiquidChemical getLiquidChemicalById(Long id) throws Exception;
    List<LiquidChemicalDTO> getAllLiquidChemicalDTO() throws Exception;
    LiquidChemical addLiquidChemicals(LiquidChemical liquidChemical) throws Exception;
    LiquidChemical updateLiquidChemical(Long id , LiquidChemical liquidChemical) throws Exception;
    void deleteLiquidChemical(Long id) throws Exception;

    /////////////SolidChemicals/////////////
    SolidChemical getSolidChemicalById(Long id) throws Exception;
    List<SolidChemicalDTO> getAllSolidChemicalDTO() throws  Exception;
    SolidChemical addSolidChemicals(SolidChemical solidChemical) throws Exception;
    SolidChemical updateSolidChemical(Long id, SolidChemical solidChemical) throws Exception;
    void deleteSolidChemical(Long id) throws Exception;




}
