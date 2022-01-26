package com.hector.rentcar.repository;

import com.hector.rentcar.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findCustomerByEmail(String email);

    @Query(value = "{call register(:email_v, :name_v, :middle_name_v, :last_name_v ,:phone_v)}", nativeQuery = true)
    Optional<Customer> register(
            @Param("email_v") String email_v,
            @Param("name_v") String name_v,
            @Param("middle_name_v") String middle_name_v,
            @Param("last_name_v") String last_name_v,
            @Param("phone_v") String phone_v);
}
