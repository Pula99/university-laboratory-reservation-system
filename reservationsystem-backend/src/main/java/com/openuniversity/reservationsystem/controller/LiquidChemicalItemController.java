package com.openuniversity.reservationsystem.controller;

import com.openuniversity.reservationsystem.model.LiquidChemicalItems;
import com.openuniversity.reservationsystem.service.LiquidChemicalItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://http://localhost:3000/")
@AllArgsConstructor
@RestController
@RequestMapping("${endpoint.liquidchemicalitems}")
public class LiquidChemicalItemController {

    private final LiquidChemicalItemService liquidChemicalItemService;

    @GetMapping("{id}")
    public ResponseEntity<LiquidChemicalItems> getLiquidChemicalItemById(@PathVariable Long id){
        try {
            LiquidChemicalItems liquidChemicalItems = liquidChemicalItemService.getLiquidChemicalItemById(id);
            return ResponseEntity.ok(liquidChemicalItems);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
