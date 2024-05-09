package com.openuniversity.reservationsystem.service;

import com.openuniversity.reservationsystem.model.LabEquipmentItems;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LabEquipmentItemService {

    LabEquipmentItems getLabEquipmentItemsByReservationId (Long id) throws Exception;

    void deleteLabEquipmentItem(Long id) throws Exception;


}
