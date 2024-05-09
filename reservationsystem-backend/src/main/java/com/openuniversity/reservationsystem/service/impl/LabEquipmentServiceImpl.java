package com.openuniversity.reservationsystem.service.impl;

import com.openuniversity.reservationsystem.dto.labEquipment.LabEquipmentDTO;
import com.openuniversity.reservationsystem.model.LabEquipment;
import com.openuniversity.reservationsystem.repository.LabEquipmentRepository;
import com.openuniversity.reservationsystem.service.LabEquipmentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LabEquipmentServiceImpl implements LabEquipmentService {

    private final LabEquipmentRepository labEquipmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public LabEquipment addLabEquipments(LabEquipment labEquipment) {
        try {
            return labEquipmentRepository.save(labEquipment);
        } catch (Exception exception){
            log.error("Error occuerd when adding new LabEquipment, error{}" , exception.getMessage());
            throw exception;
        }
    }

    @Override
    public LabEquipment updateLabEquipment(Long id, LabEquipment updateLabEquipment){
        try {
            LabEquipment labEquipment = labEquipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("item not found"));
            modelMapper.map(updateLabEquipment,labEquipment);
            return labEquipmentRepository.save(labEquipment);
        } catch (Exception exception) {
            log.error("Error occured when updating lab equipment with id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }

    @Override
    public LabEquipment getLabEquipmentById (Long id) {
        try {
            return labEquipmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        } catch (Exception exception) {
            log.error("error occured when getting Lab Equipment with id {}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }

    @Override
    public List<LabEquipmentDTO> getAllLabEquipmentDTO() {
        List<LabEquipment> labEquipments = labEquipmentRepository.findAll();

        List<LabEquipmentDTO> labEquipmentDTOS = labEquipments
                .stream()
                .filter(chemical -> chemical.getAvailableQuantity()  >= 500)
                .map(data -> new LabEquipmentDTO(
                        data.getEquipmentName(),
                        data.getEquipmentType(),
                        data.getEquipmentDescription(),
                        data.getEquipmentInstruction(),
                        data.getAvailableQuantity()
                ))
                .collect(Collectors.toList());
        return labEquipmentDTOS;
    }

    @Override
    public void deleteLabEquipment(Long id) throws Exception{
        try {
            labEquipmentRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error occured when deleting lab equipment with id{}, Error{}",id, exception.getMessage());
            throw exception;
        }
    }
}
