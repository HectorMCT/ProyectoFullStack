package com.hector.rentcar.repository;

import com.hector.rentcar.model.Car;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface CarRepository extends JpaRepository<Car, String> {

    @Query(value = "{CALL list_avaliable(:startDate, :endDate)}", nativeQuery = true)
    Optional<List<Car>> listAvailable(@Param("startDate") String startDate, @Param("endDate") String endDate);

    @Query(value = "EXECUTE IMMEDIATE :sort", nativeQuery = true)
    Optional<List<Car>> listAvailableByFilters( @Param("sort") String sort);

    @Query(value = "SELECT DISTINCT category FROM car ORDER BY category ASC", nativeQuery = true)
    Optional<List<String>> getCategories();

    @Query(value = "SELECT DISTINCT color FROM car ORDER BY color ASC", nativeQuery = true)
    Optional<List<String>> getColors();

    @Query(value = "SELECT DISTINCT year FROM car ORDER BY year ASC", nativeQuery = true)
    Optional<List<String>> getYears();

    @Query(value = "SELECT DISTINCT model FROM car ORDER BY model ASC", nativeQuery = true)
    Optional<List<String>> getModels();

    @Query(value = "SELECT DISTINCT make FROM car ORDER BY make ASC", nativeQuery = true)
    Optional<List<String>> getMaker();

}
