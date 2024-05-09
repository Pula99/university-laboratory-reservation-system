package com.openuniversity.reservationsystem.service;

import com.openuniversity.reservationsystem.dto.reservation.CreateReservationDTO;
import com.openuniversity.reservationsystem.model.Reservation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {

   Reservation getReservationById(Long id) throws Exception;

    List<Reservation> getReservationsByUsername(String name);

    List<CreateReservationDTO> getAllReservations();
    Reservation createReservation(CreateReservationDTO createReservationDTO) throws Exception;
    Reservation updateReservation(Long id, Reservation reservation) throws Exception;
    void deleteReservation (Long id) throws Exception;




}
