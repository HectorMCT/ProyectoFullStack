package com.hector.rentcar.service;

import com.hector.rentcar.model.Rent;
import com.hector.rentcar.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentService {

    @Autowired
    RentRepository rentRepository;

    public Optional<List<Rent>> getByEmail(String email) {
        return rentRepository.findRentsByEmail(email);
    }

    public Rent create(Rent rent) {
        return rentRepository.save(rent);
    }

    public Optional<Rent> getById(Integer id) {
        return rentRepository.findById(id);
    }

    public Rent update(Rent rent) {
        return rentRepository.save(rent);
    }
}
