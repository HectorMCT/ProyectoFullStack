package com.hector.rentcar.service;

import com.hector.rentcar.model.Car;
import com.hector.rentcar.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CarService {


    @Autowired
    CarRepository carRepository;


    public Optional<List<Car>> availableCars(String start, String end){
        return carRepository.listAvailable(start, end);
    }

    public Optional<List<Car>> getByPrice(
            String categoriaf,
            String colorf,
            String yearf,
            String modelf,
            String makef,
            String ordderf,
            String startDate,
            String endDate) {

        String query = String.format("SELECT * FROM (SELECT * FROM car WHERE VIN NOT IN (SELECT rent.VIN FROM rent)" +
                " UNION SELECT * FROM car WHERE VIN IN (SELECT rent.VIN FROM rent WHERE (( '%s' > rent.return_date AND " +
                "'%s' > rent.rental_date) OR ( '%s' < rent.return_date AND '%s' < rent.rental_date) OR status = 0))) " +
                "AS av_filtered WHERE category %s AND color %s AND year %s  AND model %s AND make %s ORDER BY price %s"
                , startDate, endDate, startDate, endDate, categoriaf, colorf, yearf, modelf, makef, ordderf);

        return carRepository.listAvailableByFilters(query);
    }

    public Optional<List<String>> categories() {
        return carRepository.getCategories();
    }

    public Optional<List<String>> colors() {
        return carRepository.getColors();
    }

    public Optional<List<String>> years() {
        return carRepository.getYears();
    }

    public Optional<List<String>> model() {
        return carRepository.getModels();
    }

    public Optional<List<String>> maker() {
        return carRepository.getMaker();
    }
}
