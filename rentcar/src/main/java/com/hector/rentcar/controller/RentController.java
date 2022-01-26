package com.hector.rentcar.controller;


import com.hector.rentcar.model.Rent;
import com.hector.rentcar.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rent")
public class RentController {

    @Autowired
    RentService rentService;

    @GetMapping("")
    public ResponseEntity<List<Rent>> customerRents(@RequestParam("email") String email){
        Optional<List<Rent>> rents = rentService.getByEmail(email);
        return rents.map(rentList -> new ResponseEntity<>(rentList, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/rented")
    public ResponseEntity customerRent(@RequestParam("id") Integer id){
        Optional<Rent> rent = rentService.getById(id);
        return rent.map(value -> new ResponseEntity(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @PostMapping("/new")
    public ResponseEntity saveRent(@RequestBody Rent rent){

        Rent newRent = null;
        try{
            newRent = rentService.create(rent);
        } catch (Exception e) {
            return new ResponseEntity("It is impossible rent this car.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(newRent, HttpStatus.CREATED);
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<Rent> returnCar(@PathVariable Integer id){

        Optional<Rent> newRent = null;
        try{
            newRent = rentService.getById(id);
            if (newRent.isPresent()){
                Rent updateStatus = newRent.get();
                updateStatus.setStatu(false);
                updateStatus = rentService.update(updateStatus);
                return new ResponseEntity(updateStatus, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity("It is impossible rent this car.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity("It is impossible rent this car.", HttpStatus.BAD_REQUEST);
        }
    }
}
