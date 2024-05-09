package com.openuniversity.reservationsystem.service.impl;

import com.openuniversity.reservationsystem.model.SolidChemicalItems;
import com.openuniversity.reservationsystem.repository.SolidChemicalItemRepository;
import com.openuniversity.reservationsystem.service.SolidChemicalItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SolidChemicalItemImpl implements SolidChemicalItemService {

    private final SolidChemicalItemRepository solidChemicalItemRepository;

    @Override
    public SolidChemicalItems addSolidChemicalItems(SolidChemicalItems solidChemicalItems){
        try {
            return solidChemicalItemRepository.save(solidChemicalItems);
        } catch (Exception exception) {
            log.error("Error occuerd when adding new items, Error{}", exception.getMessage());
            throw exception;
        }
    }

    @Override
    public void deleteSolidChemicalItem(Long id) {
        try {
            solidChemicalItemRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error occured when deleting reservation with id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }
}
