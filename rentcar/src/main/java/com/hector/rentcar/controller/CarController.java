package com.hector.rentcar.controller;

import com.hector.rentcar.model.Car;
import com.hector.rentcar.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import static com.hector.rentcar.utils.Utils.validateDate;

@RestController
@RequestMapping("/api/v1/cars")
public class CarController {

    @Autowired
    CarService carService;

    @GetMapping()
    public ResponseEntity<List<Car>> lista(@RequestParam("start") String start, @RequestParam("end") String end){

        Optional<List<Car>> cars = Optional.empty();

        if (validateDate(start, end)) {
            cars = carService.availableCars(start, end);
        } else {
            return new ResponseEntity("Start date must be before End Date", HttpStatus.BAD_REQUEST);
        }

        return cars.map(carList -> new ResponseEntity(carList, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("CARS NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/category")
    public ResponseEntity listCategory(){
        Optional<List<String>> cars = carService.categories();
        return cars.map(carList -> new ResponseEntity(carList, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("CATEGORIES' CARS NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/colors")
    public ResponseEntity listColors(){
        Optional<List<String>> cars = carService.colors();
        return cars.map(carList -> new ResponseEntity(carList, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("COLORS' CARS NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/year")
    public ResponseEntity listYear(){
        Optional<List<String>> cars = carService.years();
        return cars.map(carList -> new ResponseEntity(carList, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("YEAR'S CARS NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/model")
    public ResponseEntity listModel(){
        Optional<List<String>> cars = carService.model();
        return cars.map(carList -> new ResponseEntity(carList, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("MODEL'S CARS NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/maker")
    public ResponseEntity listMaker(){
        Optional<List<String>> cars = carService.maker();
        return cars.map(carList -> new ResponseEntity(carList, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("MAKER'S CARS NOT FOUND", HttpStatus.NOT_FOUND));
    }

    @GetMapping("/filters")
    public ResponseEntity<List<Car>> priceRangeCar(
            @RequestParam(defaultValue = "IS NOT NULL", name = "categoriaf") String categoriaf,
            @RequestParam(defaultValue = "IS NOT NULL", name = "colorf") String colorf,
            @RequestParam(defaultValue = "IS NOT NULL", name = "yearf") String yearf,
            @RequestParam(defaultValue = "IS NOT NULL", name = "modelf") String modelf,
            @RequestParam(defaultValue = "IS NOT NULL", name = "makef") String makef,
            @RequestParam(defaultValue = "IS NOT NULL", name = "ordderf") String ordderf,
            @RequestParam(defaultValue = "IS NOT NULL", name = "startDate") String startDate,
            @RequestParam(defaultValue = "IS NOT NULL", name = "endDate") String endDate) {
        if (!categoriaf.equals("IS NOT NULL")) {
            categoriaf = "= '" + categoriaf + "'";
        }

        if (!colorf.equals("IS NOT NULL")) {
            colorf = "= '" + colorf + "'";
        }

        if (!yearf.equals("IS NOT NULL")) {
            yearf = "= '" + yearf + "'";
        }

        if (!modelf.equals("IS NOT NULL")) {
            modelf = "= '" + modelf + "'";
        }

        if (!makef.equals("IS NOT NULL")) {
            makef = "= '" + makef + "'";
        }

        Optional<List<Car>> carList = Optional.empty();

        if (validateDate(startDate, endDate)) {
            carList = carService.getByPrice(categoriaf, colorf, yearf, modelf, makef, ordderf, startDate, endDate);
        } else {
            return new ResponseEntity("Start date must be before End Date", HttpStatus.BAD_REQUEST);
        }

        return carList.map(cars -> new ResponseEntity(cars, HttpStatus.OK)).orElseGet(() -> new ResponseEntity("CARS NOT FOUND", HttpStatus.NOT_FOUND));
    }

}
