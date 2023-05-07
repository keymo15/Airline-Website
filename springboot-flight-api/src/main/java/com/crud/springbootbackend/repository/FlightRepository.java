package com.crud.springbootbackend.repository;

import com.crud.springbootbackend.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Integer> {
    List<Flight> findFlightsByOrigin(String origin);

    List<Flight> getFlightsByOriginAndDestination(String origin, String destination);
}
