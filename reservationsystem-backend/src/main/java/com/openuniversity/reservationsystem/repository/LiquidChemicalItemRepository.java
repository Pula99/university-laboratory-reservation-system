package com.openuniversity.reservationsystem.repository;

import com.openuniversity.reservationsystem.model.LiquidChemicalItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LiquidChemicalItemRepository extends JpaRepository<LiquidChemicalItems, Long> {
    //LiquidChemicalItems findByChemicalName (String chemicalName);
}
