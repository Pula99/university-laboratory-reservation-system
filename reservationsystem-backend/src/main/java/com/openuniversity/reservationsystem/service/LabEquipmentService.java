package com.openuniversity.reservationsystem.service;

import com.openuniversity.reservationsystem.dto.labEquipment.LabEquipmentDTO;
import com.openuniversity.reservationsystem.model.LabEquipment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LabEquipmentService {

    List<LabEquipmentDTO> getAllLabEquipmentDTO() throws Exception;
    LabEquipment getLabEquipmentById(Long id) throws Exception;
    LabEquipment addLabEquipments(LabEquipment labEquipment) throws Exception;
    LabEquipment updateLabEquipment(Long id, LabEquipment labEquipment) throws Exception;
    void deleteLabEquipment(Long id) throws Exception;
}
