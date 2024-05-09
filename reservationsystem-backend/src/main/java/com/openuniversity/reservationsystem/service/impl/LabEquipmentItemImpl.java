package com.openuniversity.reservationsystem.service.impl;

import com.openuniversity.reservationsystem.model.LabEquipmentItems;
import com.openuniversity.reservationsystem.repository.LabEquipmentItemRepository;
import com.openuniversity.reservationsystem.service.LabEquipmentItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LabEquipmentItemImpl implements LabEquipmentItemService {

    private final LabEquipmentItemRepository labEquipmentItemRepository;

     @Override
    public LabEquipmentItems getLabEquipmentItemsByReservationId (Long id){
         try {
             return labEquipmentItemRepository.findById(id).orElseThrow(()-> new RuntimeException("Item not found"));
         } catch (Exception exception){
             log.error("Error ouccerd when adding items , Error{}", exception.getMessage());
             throw exception;
         }
     }

     @Override
    public void deleteLabEquipmentItem (Long id) {
         try {
             labEquipmentItemRepository.deleteById(id);
         } catch (Exception exception) {
             log.error("Error occured when deleting reservation with id{}, Error{}",id,exception.getMessage());
             throw exception;
         }
     }
}
