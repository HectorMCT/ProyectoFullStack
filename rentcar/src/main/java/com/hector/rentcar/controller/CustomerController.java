package com.hector.rentcar.controller;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hector.rentcar.model.Car;
import com.hector.rentcar.model.Customer;
import com.hector.rentcar.service.CarService;
import com.hector.rentcar.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {


    @JsonSerialize
    public class EmptyJsonResponse { }

    @Autowired
    CustomerService customerService;

    @GetMapping("/search/{email}")
    public ResponseEntity<Customer> customer(@PathVariable("email") String email){
        Optional<Customer> customer = customerService.getByEmail(email);
        return new ResponseEntity(customer, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Customer> saveCustomer(@RequestBody Customer customer){

        Customer cliente = customerService.create(customer);

        if (cliente == null){
            return new ResponseEntity(new EmptyJsonResponse(), HttpStatus.CREATED);
        }
        return new ResponseEntity(cliente, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable("id") Integer id, @RequestBody Customer customer){
        customer.setClient_id(id);
        return new ResponseEntity(customerService.updateCustomer(customer), HttpStatus.OK);
    }

}
