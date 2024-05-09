package com.openuniversity.reservationsystem.controller;

import com.openuniversity.reservationsystem.dto.reservation.CreateReservationDTO;
import com.openuniversity.reservationsystem.model.Reservation;
import com.openuniversity.reservationsystem.model.User;
import com.openuniversity.reservationsystem.service.ReservationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://http://localhost:3000/")
@RestController
@AllArgsConstructor
@RequestMapping("${endpoint.reservations}")
public class ReservationController {

    private final ReservationService reservationService;
    private final ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody CreateReservationDTO createReservationDTO) {
        try {
            Reservation reservation = modelMapper.map(createReservationDTO, Reservation.class);
            Reservation createdReservation = reservationService.createReservation(createReservationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReservation);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @Valid @RequestBody CreateReservationDTO createReservationDTO) {
        try {
            Reservation reservation = modelMapper.map(createReservationDTO,Reservation.class);
            Reservation newUpdatedReservation = reservationService.updateReservation(id, reservation);
            return ResponseEntity.ok(newUpdatedReservation);
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @GetMapping("{id}")
    public ResponseEntity<Reservation> getReservationById (@PathVariable Long id ){
        try {
            Reservation reservation = reservationService.getReservationById(id);
            return ResponseEntity.ok(reservation);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
//    @GetMapping("/{name}")
//    public List<Reservation> getReservationByName(@PathVariable String name) throws Exception {
//        return reservationService.getReservationByName(name);
//
//    }

    @GetMapping
    public List<CreateReservationDTO> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Reservation> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/userReservationData/{name}")
    public ResponseEntity<List<Reservation>> getReservationsByUsername(@PathVariable String name) {
        List<Reservation> reservations = reservationService.getReservationsByUsername(name);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }




}
