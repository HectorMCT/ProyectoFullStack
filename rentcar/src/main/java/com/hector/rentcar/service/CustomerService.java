package com.hector.rentcar.service;

import com.hector.rentcar.model.Customer;
import com.hector.rentcar.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    protected CustomerRepository customerRepository;

    public Optional<Customer> getByEmail(String email){
        return customerRepository.findCustomerByEmail(email);
    }

    public Customer create(Customer customer) {
        Optional<Customer> cliente = customerRepository.register(customer.getEmail(), customer.getName(), customer.getMiddleName(), customer.getLastName(), customer.getPhone());
        return cliente.orElse(null);
    }

    public Customer updateCustomer(Customer customer){ return customerRepository.save(customer); }
}
