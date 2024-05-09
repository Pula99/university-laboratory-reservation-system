package com.openuniversity.reservationsystem.repository;

import com.openuniversity.reservationsystem.model.LiquidChemical;
import com.openuniversity.reservationsystem.model.SolidChemical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolidChemicalRepository extends JpaRepository <SolidChemical, Long> {
     SolidChemical findByChemicalName(String chemicalName);
}
