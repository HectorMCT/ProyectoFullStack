package com.hector.rentcar.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

    public static Boolean validateDate(String start, String end) throws RuntimeException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Date startDate;
        Date endDate;

        try {
            startDate = formatter.parse(start);
            endDate = formatter.parse(end);
        } catch (ParseException ignored) {
            throw new RuntimeException("Parser failed");
        }
        return startDate.before(endDate);
    }
}
