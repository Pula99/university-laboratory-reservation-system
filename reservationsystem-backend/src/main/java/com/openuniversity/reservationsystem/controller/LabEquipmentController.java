package com.openuniversity.reservationsystem.controller;

import com.openuniversity.reservationsystem.dto.labEquipment.CreateLabEquipmentDTO;
import com.openuniversity.reservationsystem.dto.labEquipment.LabEquipmentDTO;
import com.openuniversity.reservationsystem.model.LabEquipment;
import com.openuniversity.reservationsystem.service.LabEquipmentService;
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
@RequestMapping("${endpoint.labequipments}")
public class LabEquipmentController {

    private final LabEquipmentService labEquipmentService;
    private final ModelMapper modelMapper;


    @PostMapping("")
    public ResponseEntity<LabEquipment> addLabEquipments(@Valid @RequestBody CreateLabEquipmentDTO createLabEquipmentDTO){
        try {
            LabEquipment labEquipmentData = modelMapper.map(createLabEquipmentDTO, LabEquipment.class);
            LabEquipment newLabEquipment = labEquipmentService.addLabEquipments(labEquipmentData);
            return ResponseEntity.created(URI.create("" + newLabEquipment.getId())).body(newLabEquipment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("")
    public List<LabEquipmentDTO> getAllLabEquipmentDTO(){
        try {
            return labEquipmentService.getAllLabEquipmentDTO();
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    @GetMapping("{id}")
    public ResponseEntity<LabEquipment> getLabEquipmentById(@PathVariable Long id) {
        try {
            LabEquipment labEquipment = labEquipmentService.getLabEquipmentById(id);
            return ResponseEntity.ok(labEquipment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<LabEquipment> updateLabEquipment (@PathVariable Long id, @Valid @RequestBody CreateLabEquipmentDTO createLabEquipmentDTO){
        try {
            LabEquipment labEquipment = modelMapper.map(createLabEquipmentDTO,LabEquipment.class);
            LabEquipment newUpdatedLabEquipment = labEquipmentService.updateLabEquipment(id, labEquipment);
            return ResponseEntity.ok(newUpdatedLabEquipment);
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<LabEquipment> deleteLabEquipment (@PathVariable Long id) {
        try {
            labEquipmentService.deleteLabEquipment(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
