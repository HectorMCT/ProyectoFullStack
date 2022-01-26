CREATE TABLE employed(
    employed_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20),
    last_name VARCHAR(20) NOT NULL,
    email varchar(30) NOT NULL,
    phone varchar(12) NOT NULL
);

CREATE TABLE car(
    VIN VARCHAR(17) PRIMARY KEY,
    category VARCHAR(15) NOT NULL,
    make VARCHAR(15) NOT NULL,
    model VARCHAR(15) NOT NULL,
    year VARCHAR(4) NOT NULL,
    color VARCHAR(10) NOT NULL,
    price DOUBLE NOT NULL,
    description VARCHAR(4096) not null
);

CREATE TABLE customer(
    client_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20),
    last_name VARCHAR(20) NOT NULL,
    phone VARCHAR(12) NOT NULL
);

drop table IF EXISTS rent;
CREATE TABLE rent(
    rental_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    VIN VARCHAR(17) NOT NULL,
    client_id VARCHAR(50) NOT NULL,
    total_amount DOUBLE DEFAULT 0,
    rental_date DATE NOT NULL,
    return_date DATE NOT NULL,
    status BOOLEAN NOT NULL,
    CONSTRAINT fk_Vehicle FOREIGN KEY (VIN) REFERENCES car(VIN),
    CONSTRAINT fk_Client FOREIGN KEY (client_id) REFERENCES customer(email)
);

DROP TRIGGER IF EXISTS rents_ai;

CREATE TRIGGER rents_ai
    BEFORE INSERT ON rent FOR EACH ROW
    BEGIN
        DECLARE vPrice DOUBLE;
        DECLARE vDays INTEGER;

        SELECT price FROM car WHERE VIN = new.VIN INTO vPrice;
        SELECT DATEDIFF(new.return_date, new.rental_date) INTO vDays;
        IF vDays = 0 THEN
            SET vDays = 1;
        END if;

        SET new.total_amount = ROUND(vPrice*vDays, 2);
        SET NEW.status = 1;
    END;



drop trigger IF EXISTS renting;
CREATE TRIGGER renting
    before insert on rent FOR EACH ROW
    BEGIN
        DECLARE vAmount DOUBLE;
        DECLARE vPrice DOUBLE;

        SELECT price from car where VIN = new.VIN INTO vPrice;
        SET vAmount = vPrice * DATEDIFF(new.return_date,new.rental_date);
        SET new.total_amount=vAmount;
    END;


DROP PROCEDURE IF EXISTS list_avaliable;
CREATE PROCEDURE list_avaliable(IN startDate VARCHAR(10), IN endDate VARCHAR(10)) NOT DETERMINISTIC READS SQL DATA SQL SECURITY DEFINER
   SELECT * FROM car WHERE VIN NOT IN (SELECT rent.VIN FROM rent) UNION SELECT * FROM car WHERE VIN IN (SELECT rent.VIN FROM rent
WHERE ((startDate > rent.return_date AND endDate > rent.rental_date)
   OR (startDate < rent.return_date AND endDate < rent.rental_date) OR status = 0));


CREATE PROCEDURE register(IN email_v VARCHAR(50), IN name_v VARCHAR(20), IN  middle_name_v VARCHAR(20), IN last_name_v VARCHAR(20), IN phone_v VARCHAR(12))
BEGIN
    IF email_v NOT IN (SELECT c.email FROM customer c) THEN
        INSERT INTO customer (email, name, middle_name, last_name, phone)
        VALUES (email_v, name_v, middle_name_v, last_name_v, phone_v);
        SELECT * FROM customer WHERE customer.email LIKE email_v;
    ELSE
        SELECT * FROM customer WHERE customer.email LIKE '/';
    END IF;

END;
