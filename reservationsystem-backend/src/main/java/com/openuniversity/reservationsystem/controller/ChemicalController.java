package com.openuniversity.reservationsystem.controller;

import com.openuniversity.reservationsystem.dto.liquidChemical.CreateLiquidChemicalDTO;
import com.openuniversity.reservationsystem.dto.solidChemical.CreateSolidChemicalDTO;
import com.openuniversity.reservationsystem.dto.liquidChemical.LiquidChemicalDTO;
import com.openuniversity.reservationsystem.dto.solidChemical.SolidChemicalDTO;
import com.openuniversity.reservationsystem.model.LiquidChemical;
import com.openuniversity.reservationsystem.model.SolidChemical;
import com.openuniversity.reservationsystem.service.ChemicalService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://http://localhost:3000/")
@AllArgsConstructor
@RestController
@RequestMapping("${endpoint.chemicals}")
public class ChemicalController {

    private final ChemicalService chemicalService;
    private final ModelMapper modelMapper;

    /////////////LiquidChemicals/////////////

    @PostMapping("/liquids")
    public ResponseEntity<LiquidChemical> addLiquidChemicals(@Valid @RequestBody CreateLiquidChemicalDTO createLiquidChemicalDTO){
        try {
            LiquidChemical liquidChemicalData = modelMapper.map(createLiquidChemicalDTO, LiquidChemical.class);
            LiquidChemical newLiquidChemical = chemicalService.addLiquidChemicals(liquidChemicalData);
            return ResponseEntity.created(URI.create("" + newLiquidChemical.getId())).body(newLiquidChemical);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/liquids/{id}")
    public ResponseEntity<LiquidChemical> updateLiquidChemical (@PathVariable Long id, @Valid @RequestBody CreateLiquidChemicalDTO createLiquidChemicalDTO) {
        try {
            LiquidChemical liquidChemical = modelMapper.map(createLiquidChemicalDTO,LiquidChemical.class);
            LiquidChemical newUpdatedLiquidChemical = chemicalService.updateLiquidChemical(id, liquidChemical);
            return ResponseEntity.ok(newUpdatedLiquidChemical);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/liquids")
    public List<LiquidChemicalDTO> getAllLiquidChemicalDTO(){
        try {
            return chemicalService.getAllLiquidChemicalDTO();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/liquids/{id}")
    public ResponseEntity<LiquidChemical> getLiquidChemicalById(@PathVariable Long id) {
        try {
            LiquidChemical liquidChemical = chemicalService.getLiquidChemicalById(id);
            return ResponseEntity.ok(liquidChemical);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/liquids/{id}")
    public ResponseEntity<LiquidChemical> deleteLiquidChemical(@PathVariable Long id) {
        try {
            chemicalService.deleteLiquidChemical(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /////////////SolidChemicals/////////////


    @PostMapping("/solids")
    public ResponseEntity<SolidChemical> addSolidChemicals(@Valid @RequestBody CreateSolidChemicalDTO createSolidChemicalDTO){
        try {
            SolidChemical solidChemicalData = modelMapper.map(createSolidChemicalDTO, SolidChemical.class);
            SolidChemical newSolidChemical = chemicalService.addSolidChemicals(solidChemicalData);
            return ResponseEntity.created(URI.create("" + newSolidChemical.getId())).body(newSolidChemical);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/solids/{id}")
    public ResponseEntity<SolidChemical> updateSolidChemical(@PathVariable Long id, @Valid @RequestBody CreateSolidChemicalDTO createSolidChemicalDTO){
        try {
            SolidChemical solidChemical = modelMapper.map(createSolidChemicalDTO,SolidChemical.class);
            SolidChemical newUpdatedSolidChemical = chemicalService.updateSolidChemical(id, solidChemical);
            return ResponseEntity.ok(newUpdatedSolidChemical);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/solids")
    public List<SolidChemicalDTO> getAllSolidChemicalDTO(){
        try {
            return chemicalService.getAllSolidChemicalDTO();
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/solids/{id}")
    public ResponseEntity<SolidChemical> getSolidChemicalById(@PathVariable Long id) {
        try {
            SolidChemical solidChemical = chemicalService.getSolidChemicalById(id);
            return ResponseEntity.ok(solidChemical);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/solids/{id}")
    public ResponseEntity<Void> deleteSolidChemical (@PathVariable Long id) {
        try {
            chemicalService.deleteSolidChemical(id);
            return  ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
