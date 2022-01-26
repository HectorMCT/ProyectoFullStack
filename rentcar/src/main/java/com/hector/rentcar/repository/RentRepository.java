package com.hector.rentcar.repository;

import com.hector.rentcar.model.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentRepository extends JpaRepository<Rent, Integer> {

    @Query(value = "SELECT * FROM rent WHERE client_id = :email", nativeQuery = true)
    Optional<List<Rent>> findRentsByEmail(@Param("email") String email);
}
