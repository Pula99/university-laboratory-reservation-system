package com.openuniversity.reservationsystem.repository;

import com.openuniversity.reservationsystem.model.LiquidChemical;
import com.openuniversity.reservationsystem.model.SolidChemical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LiquidChemicalRepository extends JpaRepository <LiquidChemical, Long> {
    LiquidChemical findByChemicalName (String chemicalName);

}
