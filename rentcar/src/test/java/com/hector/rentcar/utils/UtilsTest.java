package com.hector.rentcar.utils;

import org.junit.jupiter.api.Test;

import static com.hector.rentcar.utils.Utils.validateDate;
import static org.junit.Assert.assertEquals;


public class UtilsTest {

    @Test
    public void validateDateTest() {
        assertEquals(true, validateDate("2022-01-10","2022-01-20"));
    }
}