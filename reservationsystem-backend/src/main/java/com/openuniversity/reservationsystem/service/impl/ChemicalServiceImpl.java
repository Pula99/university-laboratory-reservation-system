package com.openuniversity.reservationsystem.service.impl;

import com.openuniversity.reservationsystem.dto.liquidChemical.LiquidChemicalDTO;
import com.openuniversity.reservationsystem.dto.solidChemical.SolidChemicalDTO;
import com.openuniversity.reservationsystem.model.LiquidChemical;
import com.openuniversity.reservationsystem.model.SolidChemical;
import com.openuniversity.reservationsystem.repository.LiquidChemicalRepository;
import com.openuniversity.reservationsystem.repository.SolidChemicalRepository;
import com.openuniversity.reservationsystem.service.ChemicalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChemicalServiceImpl implements ChemicalService {

    private final LiquidChemicalRepository liquidChemicalRepository;
    private final SolidChemicalRepository solidChemicalRepository;
    private final ModelMapper modelMapper;

    /////////////LiquidChemicals/////////////

    @Override
    public LiquidChemical getLiquidChemicalById (Long id) {
        try {
            return liquidChemicalRepository.findById(id).orElseThrow(()-> new RuntimeException("Item not found"));
        } catch (Exception exception ){
            log.error("Error occured when getting Liquid Chemical with id {}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }

    @Override
    public LiquidChemical addLiquidChemicals(LiquidChemical liquidChemical){
        try {
            return liquidChemicalRepository.save(liquidChemical);
        } catch (Exception exception){
            log.error("Error occured when adding new Chemical, error{}",exception.getMessage());
            throw exception;
        }
    }

    @Override
    public void deleteLiquidChemical (Long id) throws Exception{
        try {
            liquidChemicalRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("error occured when deleting liquid chemical with id{}, Error{}",id,exception.getMessage());
        }
    }

    @Override
    public LiquidChemical updateLiquidChemical(Long id, LiquidChemical updatedliquidChemical) {
        try {
            LiquidChemical liquidChemical = liquidChemicalRepository.findById(id).orElseThrow(()->new RuntimeException("item not found"));
            modelMapper.map(updatedliquidChemical,liquidChemical);
            return liquidChemicalRepository.save(liquidChemical);
        } catch (Exception exception) {
            log.error("Error occured when updating liquid chemical with id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }

    @Override
    public List<LiquidChemicalDTO> getAllLiquidChemicalDTO() {
        List<LiquidChemical> liquidChemicals = liquidChemicalRepository.findAll();

        List<LiquidChemicalDTO> liquidChemicalDTOS = liquidChemicals
                .stream()
                .filter(chemical -> chemical.getAvailableQuantityInLitre()  >= 500)
                .map(data -> new LiquidChemicalDTO(
                        data.getChemicalName(),
                        data.getChemicalCommonName(),
                        data.getChemicalFormula(),
                        data.getChemicalProperties(),
                        data.getChemicalHazard(),
                        data.getStorageCondition(),
                        data.getSafetyDataSheet(),
                        data.getPurchaseDate(),
                        data.getExpireDate(),
                        data.getAvailableQuantityInLitre()
                ))
                .collect(Collectors.toList());
        return liquidChemicalDTOS;
    }


    /////////////SolidChemicals/////////////

    @Override
    public SolidChemical addSolidChemicals(SolidChemical solidChemical){
        try {
            return solidChemicalRepository.save(solidChemical);
        } catch (Exception exception){
            log.error("Error occured when adding new Chemical, error{}",exception.getMessage());
            throw exception;
        }
    }

    @Override
    public SolidChemical updateSolidChemical(Long id, SolidChemical updatedSolidChemical) throws Exception {
        try {
            SolidChemical solidChemical = solidChemicalRepository.findById(id).orElseThrow(()-> new RuntimeException("Item not found"));
            modelMapper.map(updatedSolidChemical,solidChemical);
            return solidChemicalRepository.save(solidChemical);
        } catch (Exception exception) {
            log.error("Error occurred when updating solid Chemicals, Error{}" ,exception.getMessage());
            throw exception;
        }
    }

    @Override
    public SolidChemical getSolidChemicalById(Long id) {
        try {
            return solidChemicalRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        } catch (Exception exception) {
            log.error("Error occured when getting Solid chemical by id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }


    @Override
    public List<SolidChemicalDTO> getAllSolidChemicalDTO() {
        List<SolidChemical> solidChemicals = solidChemicalRepository.findAll();

        List<SolidChemicalDTO> solidChemicalDTOS = solidChemicals
                .stream()
                .filter(chemical -> chemical.getAvailableQuantityinGrams()  >= 500)
                .map(data -> new SolidChemicalDTO(
                        data.getChemicalName(),
                        data.getChemicalCommonName(),
                        data.getChemicalFormula(),
                        data.getChemicalProperties(),
                        data.getChemicalHazard(),
                        data.getStorageCondition(),
                        data.getSafetyDataSheet(),
                        data.getPurchaseDate(),
                        data.getExpireDate(),
                        data.getAvailableQuantityinGrams()
                ))
                .collect(Collectors.toList());
        return solidChemicalDTOS;
    }


    @Override
    public void deleteSolidChemical(Long id) throws Exception {
        try {
            solidChemicalRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error occurred when deleting solid chemical with id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }


}
