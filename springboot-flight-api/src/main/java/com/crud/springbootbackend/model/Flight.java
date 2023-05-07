package com.crud.springbootbackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    @Id
    @JsonProperty("flight_number")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int flightNumber;

    @JsonProperty("stops")
    private int stops;

    @JsonProperty("origin")
    private String origin;

    @JsonProperty("destination")
    private String destination;

    @JsonProperty("departure_time")
    private String departureTime;

    @JsonProperty("arrival_time")
    private String arrivalTime;

    @JsonProperty("ticket_price")
    private double ticketPrice;

    @JsonProperty("company_name")
    private String companyName;

    @JsonProperty("company_image_url")
    private String companyImageUrl;

    @JsonProperty("redirect_url")
    private String redirectURL;

}
