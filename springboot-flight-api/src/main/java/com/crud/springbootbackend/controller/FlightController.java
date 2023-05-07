package com.crud.springbootbackend.controller;

import com.crud.springbootbackend.exception.ResourceNotFoundException;
import com.crud.springbootbackend.model.Flight;
import com.crud.springbootbackend.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    @Autowired
    private FlightRepository flightService;

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.findAll();
    }

    @GetMapping(params = {"origin"})
    public List<Flight> getFlightsByOrigin(@RequestParam("origin") String origin) {
        return flightService.findFlightsByOrigin(origin);
    }

    @GetMapping(params = {"origin", "destination"})
    public List<Flight> getFlightsByOriginAndDestination(
            @RequestParam("origin") String origin,
            @RequestParam("destination") String destination) {
        return flightService.getFlightsByOriginAndDestination(origin, destination);
    }

    @PostMapping("/add")
    public ResponseEntity<List<Flight>> addFlights(@RequestBody List<Flight> flights) {
        for (Flight flight : flights) {
            if (
                    flight.getStops() < 0 ||
                    flight.getOrigin() == null || flight.getOrigin().isEmpty() ||
                    flight.getDestination() == null || flight.getDestination().isEmpty() ||
                    flight.getDepartureTime() == null || flight.getDepartureTime().isEmpty() ||
                    flight.getArrivalTime() == null || flight.getArrivalTime().isEmpty() ||
                    flight.getTicketPrice() < 0 ||
                    flight.getCompanyName() == null || flight.getCompanyName().isEmpty() ||
                    flight.getCompanyImageUrl() == null || flight.getCompanyImageUrl().isEmpty() ||
                    flight.getRedirectURL() == null || flight.getRedirectURL().isEmpty()) {
                throw new IllegalArgumentException("Invalid flight data: " + flight);
            }
        }
        List<Flight> addedFlights = flightService.saveAll(flights);
        return new ResponseEntity<>(addedFlights, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable(value = "id") int flightId, @RequestBody Flight flightDetails) {
        Flight flight = flightService.findById(flightId)
                .orElseThrow(()-> new ResourceNotFoundException("Flight doesn't exist with id:"+flightId));

        if(flight == null) {
            return ResponseEntity.notFound().build();
        }

        flight.setOrigin(flightDetails.getOrigin());
        flight.setStops(flightDetails.getStops());
        flight.setDestination(flightDetails.getDestination());
        flight.setArrivalTime(flightDetails.getArrivalTime());
        flight.setDepartureTime(flightDetails.getDepartureTime());
        flight.setCompanyName(flightDetails.getCompanyName());
        flight.setCompanyImageUrl(flightDetails.getCompanyImageUrl());
        flight.setRedirectURL(flightDetails.getRedirectURL());

        Flight updatedUser = flightService.save(flight);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(value = "id") int flightId) {
        Flight flight = flightService.findById(flightId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee doesn't exist with id:"+ flightId));
        if(flight == null) {
            return ResponseEntity.notFound().build();
        }
        flightService.delete(flight);
        return ResponseEntity.noContent().build();
    }

}
