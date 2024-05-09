package com.openuniversity.reservationsystem.service.impl;

import com.openuniversity.reservationsystem.dto.reservation.CreateReservationDTO;
import com.openuniversity.reservationsystem.dto.labEquipment.LabEquipmentItemsDTO;
import com.openuniversity.reservationsystem.dto.liquidChemical.LiquidChemicalItemsDTO;
import com.openuniversity.reservationsystem.dto.solidChemical.SolidChemicalItemsDTO;
import com.openuniversity.reservationsystem.model.*;
import com.openuniversity.reservationsystem.repository.*;
import com.openuniversity.reservationsystem.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final LiquidChemicalItemRepository liquidChemicalItemRepository;
    private final LiquidChemicalRepository liquidChemicalRepository;
    private final SolidChemicalItemRepository solidChemicalItemRepository;
    private final SolidChemicalRepository solidChemicalRepository;
    private final LabEquipmentItemRepository labEquipmentItemRepository;
    private final LabEquipmentRepository  labEquipmentRepository;
    private final ModelMapper modelMapper;


//    @Override
//    @Transactional
//    public Reservation createReservation(CreateReservationDTO createReservationDTO) {
//        try {
//            Reservation reservation = modelMapper.map(createReservationDTO, Reservation.class);
//
//            // Map and associate LiquidChemicalItems with the reservation
//            List<LiquidChemicalItems> liquidChemicals = createReservationDTO.getRequestedLiquidChemicals().stream()
//                    .map(dto -> {
//                        LiquidChemicalItems liquidChemicalItem = modelMapper.map(dto, LiquidChemicalItems.class);
//                        liquidChemicalItem.setReservation(reservation); // Associate reservation with liquid chemical item
//                        return liquidChemicalItem;
//                    })
//                    .collect(Collectors.toList());
//            liquidChemicalItemRepository.saveAll(liquidChemicals);
//
//            // Map and associate SolidChemicalItems with the reservation
//            List<SolidChemicalItems> solidChemicals = createReservationDTO.getRequestedSolidChemicals().stream()
//                    .map(dto -> {
//                        SolidChemicalItems solidChemicalItem = modelMapper.map(dto, SolidChemicalItems.class);
//                        solidChemicalItem.setReservation(reservation); // Associate reservation with solid chemical item
//                        return solidChemicalItem;
//                    })
//                    .collect(Collectors.toList());
//            solidChemicalItemRepository.saveAll(solidChemicals);
//
//            // Map and associate LabEquipmentItems with the reservation
//            List<LabEquipmentItems> labEquipments = createReservationDTO.getRequestedLabEquipments().stream()
//                    .map(dto -> {
//                        LabEquipmentItems labEquipmentItem = modelMapper.map(dto, LabEquipmentItems.class);
//                        labEquipmentItem.setReservation(reservation); // Associate reservation with lab equipment item
//                        return labEquipmentItem;
//                    })
//                    .collect(Collectors.toList());
//            labEquipmentItemRepository.saveAll(labEquipments);
//
//            // Associate all items with the reservation
//            reservation.setRequestedLiquidChemicals(liquidChemicals);
//            reservation.setRequestedSolidChemicals(solidChemicals);
//            reservation.setRequestedLabEquipments(labEquipments);
//
//            // Save all items and associate them with the reservation
//            liquidChemicalItemRepository.saveAll(liquidChemicals);
//            solidChemicalItemRepository.saveAll(solidChemicals);
//            labEquipmentItemRepository.saveAll(labEquipments);
//
//            // Save and return the reservation
//            return reservationRepository.save(reservation);
//        } catch (Exception exception) {
//            log.error("Error occurred when creating reservation: {}", exception.getMessage());
//            throw exception;
//        }
//    }

    @Override
    @Transactional
    public Reservation createReservation(CreateReservationDTO createReservationDTO) {
        try {
            // Map DTO to Reservation entity
            Reservation reservation = modelMapper.map(createReservationDTO, Reservation.class);

            // Save the reservation entity first
            reservation = reservationRepository.save(reservation);

            // Reduce liquid chemical quantities
            reduceLiquidChemicalQuantities(createReservationDTO.getRequestedLiquidChemicals());

            // Reduce solid chemical quantities
            reduceSolidChemicalQuantities(createReservationDTO.getRequestedSolidChemicals());

            // Reduce lab equipment quantities
            reduceLabEquipmentQuantities(createReservationDTO.getRequestedLabEquipments());



            // Map and save LiquidChemicalItems with the reservation
            Reservation finalReservation = reservation;
            List<LiquidChemicalItems> liquidChemicals = createReservationDTO.getRequestedLiquidChemicals().stream()
                    .map(dto -> {
                        LiquidChemicalItems liquidChemicalItem = modelMapper.map(dto, LiquidChemicalItems.class);
                        liquidChemicalItem.setReservation(finalReservation);
                        return liquidChemicalItem;
                    })
                    .collect(Collectors.toList());
            liquidChemicalItemRepository.saveAll(liquidChemicals);

            // Map and save SolidChemicalItems with the reservation
            Reservation finalReservation1 = reservation;
            List<SolidChemicalItems> solidChemicals = createReservationDTO.getRequestedSolidChemicals().stream()
                    .map(dto -> {
                        SolidChemicalItems solidChemicalItem = modelMapper.map(dto, SolidChemicalItems.class);
                        solidChemicalItem.setReservation(finalReservation1);
                        return solidChemicalItem;
                    })
                    .collect(Collectors.toList());
            solidChemicalItemRepository.saveAll(solidChemicals);

            // Map and save LabEquipmentItems with the reservation
            Reservation finalReservation2 = reservation;
            List<LabEquipmentItems> labEquipments = createReservationDTO.getRequestedLabEquipments().stream()
                    .map(dto -> {
                        LabEquipmentItems labEquipmentItem = modelMapper.map(dto, LabEquipmentItems.class);
                        labEquipmentItem.setReservation(finalReservation2);
                        return labEquipmentItem;
                    })
                    .collect(Collectors.toList());
            labEquipmentItemRepository.saveAll(labEquipments);

            // Associate all items with the reservation
            reservation.setRequestedLiquidChemicals(liquidChemicals);
            reservation.setRequestedSolidChemicals(solidChemicals);
            reservation.setRequestedLabEquipments(labEquipments);

            // Return the saved reservation
            return reservation;
        } catch (Exception exception) {
            log.error("Error occurred when creating reservation: {}", exception.getMessage());
            throw exception;
        }
    }
    private void reduceLiquidChemicalQuantities(List<LiquidChemicalItemsDTO> liquidChemicalsDTO) {
        for (LiquidChemicalItemsDTO liquidChemicalDTO : liquidChemicalsDTO) {
            LiquidChemical liquidChemical = liquidChemicalRepository.findByChemicalName(liquidChemicalDTO.getChemicalName());
            if (liquidChemical == null) {
                throw new RuntimeException("Liquid chemical not found for name: " + liquidChemicalDTO.getChemicalName());
            }
            long newQuantity = liquidChemical.getAvailableQuantityInLitre() - liquidChemicalDTO.getLitre();
            if (newQuantity < 0) {
                throw new RuntimeException("Not enough quantity available for " + liquidChemicalDTO.getChemicalName());
            }
            liquidChemical.setAvailableQuantityInLitre(newQuantity);
            liquidChemicalRepository.save(liquidChemical);
        }
    }

    private void reduceSolidChemicalQuantities(List<SolidChemicalItemsDTO> solidChemicalsDTO) {
        for (SolidChemicalItemsDTO solidChemicalDTO : solidChemicalsDTO) {
            SolidChemical solidChemical = solidChemicalRepository.findByChemicalName(solidChemicalDTO.getChemicalName());
            if (solidChemical == null) {
                throw new RuntimeException("Solid chemical not found for name: " + solidChemicalDTO.getChemicalName());
            }
            long newQuantity = solidChemical.getAvailableQuantityinGrams() - solidChemicalDTO.getGrams();
            if (newQuantity < 0) {
                throw new RuntimeException("Not enough quantity available for " + solidChemicalDTO.getChemicalName());
            }
            solidChemical.setAvailableQuantityinGrams(newQuantity);
            solidChemicalRepository.save(solidChemical);
        }
    }

    private void reduceLabEquipmentQuantities(List<LabEquipmentItemsDTO> labEquipmentsDTO) {
        for (LabEquipmentItemsDTO labEquipmentDTO : labEquipmentsDTO) {
            LabEquipment labEquipment = labEquipmentRepository.findByEquipmentName(labEquipmentDTO.getEquipmentName());
            if (labEquipment == null) {
                throw new RuntimeException("Lab equipment not found for name: " + labEquipmentDTO.getEquipmentName());
            }
            long newQuantity = labEquipment.getAvailableQuantity() - labEquipmentDTO.getQuantity();
            if (newQuantity < 0) {
                throw new RuntimeException("Not enough quantity available for " + labEquipmentDTO.getEquipmentName());
            }
            labEquipment.setAvailableQuantity(newQuantity);
            labEquipmentRepository.save(labEquipment);
        }
    }


    @Override
    public Reservation getReservationById (Long id){
        try {
            return reservationRepository.findById(id).orElseThrow(() -> new RuntimeException("Reservation not found"));
        } catch (Exception exception) {
            log.error("Error occured when getting product with id {}",id, exception);
            throw exception;
        }
    }

    @Override
    public List<Reservation> getReservationsByUsername(String name) {
        return reservationRepository.findAllByName(name);
    }


    @Override
    public List<CreateReservationDTO> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();

        List<CreateReservationDTO> createReservationDTOS = reservations
                .stream()
                .map(this::mapToCreateReservationDTO)
                .collect(Collectors.toList());
        return createReservationDTOS;
    }

    @Override
    public void deleteReservation(Long id) {
        try {
            reservationRepository.deleteById(id);
        } catch (Exception exception) {
            log.error("Error occured when deleting reservation with id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }

    @Override
    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        try {
            Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
            modelMapper.map(updatedReservation,reservation);
            return  reservationRepository.save(reservation);
        } catch (Exception exception) {
            log.error("Error occured when updating Resevation with Id{}, Error{}",id,exception.getMessage());
            throw exception;
        }
    }

    private CreateReservationDTO mapToCreateReservationDTO(Reservation reservation) {
        CreateReservationDTO dto = new CreateReservationDTO();
        dto.setId(reservation.getId());
        dto.setName(reservation.getName());
        dto.setEmail(reservation.getEmail());
        dto.setRequestingCentre(reservation.getRequestingCentre());
        dto.setOrderDetails(reservation.getOrderDetails());
        dto.setOrderDate(reservation.getOrderDate());

        dto.setRequestedLiquidChemicals(mapLiquidChemicals(reservation.getRequestedLiquidChemicals()));
        dto.setRequestedSolidChemicals(mapSolidChemicals(reservation.getRequestedSolidChemicals()));
        dto.setRequestedLabEquipments(mapLabEquipments(reservation.getRequestedLabEquipments()));
        return dto;
    }

    // Method to map List<LiquidChemicalItems> to List<LiquidChemicalItemsDTO>
    private List<LiquidChemicalItemsDTO> mapLiquidChemicals(List<LiquidChemicalItems> items) {
        return items.stream()
                .map(item -> modelMapper.map(item, LiquidChemicalItemsDTO.class))
                .collect(Collectors.toList());
    }

    // Method to map List<SolidChemicalItems> to List<SolidChemicalItemsDTO>
    private List<SolidChemicalItemsDTO> mapSolidChemicals(List<SolidChemicalItems> items) {
        return items.stream()
                .map(item -> modelMapper.map(item, SolidChemicalItemsDTO.class))
                .collect(Collectors.toList());
    }

    // Method to map List<LabEquipmentItems> to List<LabEquipmentItemsDTO>
    private List<LabEquipmentItemsDTO> mapLabEquipments(List<LabEquipmentItems> items) {
        return items.stream()
                .map(item -> modelMapper.map(item, LabEquipmentItemsDTO.class))
                .collect(Collectors.toList());
    }

}


