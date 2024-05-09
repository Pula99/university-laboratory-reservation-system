package com.openuniversity.reservationsystem.repository;

import com.openuniversity.reservationsystem.model.SolidChemicalItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SolidChemicalItemRepository extends JpaRepository<SolidChemicalItems, Long> {
}
