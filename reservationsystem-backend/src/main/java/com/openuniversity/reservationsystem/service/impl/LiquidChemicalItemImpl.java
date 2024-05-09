package com.openuniversity.reservationsystem.service.impl;

import com.openuniversity.reservationsystem.model.LiquidChemicalItems;
import com.openuniversity.reservationsystem.repository.LiquidChemicalItemRepository;
import com.openuniversity.reservationsystem.service.LiquidChemicalItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class LiquidChemicalItemImpl implements LiquidChemicalItemService {

    private final LiquidChemicalItemRepository liquidChemicalItemRepository;

    @Override
    public LiquidChemicalItems getLiquidChemicalItemById (Long id){
        try {
            return liquidChemicalItemRepository.findById(id).orElseThrow(()-> new RuntimeException("Item not found"));
        } catch (Exception exception ){
            log.error("Error occured when getting Liquid Chemical with id {}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }
    @Override
    public LiquidChemicalItems addLiquidChemicalItems(LiquidChemicalItems liquidChemicalItems){
        try {
            return liquidChemicalItemRepository.save(liquidChemicalItems);
        } catch (Exception exception) {
            log.error("Error occuerd when adding new items, error{}",exception.getMessage());
            throw exception;
        }
    }

    @Override
    public void deleteLiquidChemicalItem(Long id) {
        try {
            liquidChemicalItemRepository.deleteById(id);
        } catch (Exception exception){
            log.error("Error occured when deleting reservation with id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }
}
