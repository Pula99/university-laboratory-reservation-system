package com.openuniversity.reservationsystem.repository;

import com.openuniversity.reservationsystem.model.LabEquipment;
import com.openuniversity.reservationsystem.model.LabEquipmentItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabEquipmentRepository extends JpaRepository <LabEquipment, Long> {
    LabEquipment findByEquipmentName(String equipmentName);

}
