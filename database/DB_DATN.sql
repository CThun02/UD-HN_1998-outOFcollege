﻿use master

create database DATN_DB_MS

use DATN_DB_MS

CREATE TABLE brand(
    id                  BIGINT IDENTITY PRIMARY KEY,
    brand_name          NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME
);

CREATE TABLE category(
    id                  BIGINT IDENTITY PRIMARY KEY,
    category_name       NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE pattern(
    id                  BIGINT IDENTITY PRIMARY KEY,
    pattern_name        NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE form(
    id                  BIGINT IDENTITY PRIMARY KEY,
    form_name           NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME
)

CREATE TABLE product(
    id                  BIGINT IDENTITY PRIMARY KEY,
    brand_id            BIGINT FOREIGN KEY(brand_id) REFERENCES brand(id),
    category_id         BIGINT FOREIGN KEY(category_id) REFERENCES category(id),
    product_code        NVARCHAR(50),
    product_name        NVARCHAR(50),
    img_default         VARCHAR(MAX),
    description         NVARCHAR(100),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)


CREATE TABLE collar_type(
    id                  BIGINT IDENTITY PRIMARY KEY,
    collar_type_name    NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE shirt_tail_type(
    id                  BIGINT IDENTITY PRIMARY KEY,
    shirt_tail_name     NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE material(
    id                  BIGINT IDENTITY PRIMARY KEY,
    material_name       NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE button_type(
    id                  BIGINT IDENTITY PRIMARY KEY,
    button_name         NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE sleeve_type(
    id                  BIGINT IDENTITY PRIMARY KEY,
    seleeve_name        NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE color(
    id                  BIGINT IDENTITY PRIMARY KEY,
    color_code          VARCHAR(50) UNIQUE,
    color_name          NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE size(
    id                  BIGINT IDENTITY PRIMARY KEY,
    size_name           NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE product_detail(
    id                  BIGINT IDENTITY PRIMARY KEY,
    product_id          BIGINT FOREIGN KEY(product_id) REFERENCES product(id),
	pattern_id          BIGINT FOREIGN KEY(pattern_id) REFERENCES pattern(id),
    form_id             BIGINT FOREIGN KEY(form_id) REFERENCES form(id),
    button_id           BIGINT FOREIGN KEY(button_id) REFERENCES button_type(id),
    material_id         BIGINT FOREIGN KEY(material_id) REFERENCES material(id),
    collar_id           BIGINT FOREIGN KEY(collar_id) REFERENCES collar_type(id),
    sleeve_id           BIGINT FOREIGN KEY(sleeve_id) REFERENCES sleeve_type(id),
    size_id             BIGINT FOREIGN KEY(size_id) REFERENCES size(id),
    color_id            BIGINT FOREIGN KEY(color_id) REFERENCES color(id),
    shirt_tail_id       BIGINT FOREIGN KEY(shirt_tail_id) REFERENCES shirt_tail_type(id),
    price               DECIMAL,
    quantity            INT,
    description_detail  NVARCHAR(MAX),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)


CREATE TABLE product_image(
    id                  BIGINT IDENTITY PRIMARY KEY,
    product_id		    BIGINT FOREIGN KEY(product_id) REFERENCES product(id) ,
	color_id			BIGINT FOREIGN KEY(color_id) REFERENCES color(id) , 
    path                VARCHAR(MAX),
    status              VARCHAR(50),
	is_default			BIT,
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)


CREATE TABLE promotion(
    id                  BIGINT IDENTITY PRIMARY KEY,
    promotion_code       VARCHAR(50) UNIQUE,
    promotion_name       NVARCHAR(50),
    promotion_value      DECIMAL,
    start_date          DATETIME,
    end_date            DATETIME,
    promotion_method     VARCHAR(30),
    promotion_condition  DECIMAL,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME   
)

CREATE TABLE promotion_product_detail(
    id                  BIGINT IDENTITY PRIMARY KEY,
    promotion_id         BIGINT FOREIGN KEY(promotion_id) REFERENCES promotion(id),
    product_detail_id   BIGINT FOREIGN KEY(product_detail_id) REFERENCES product_detail(id),
    percent_reduce      DECIMAL,
    money_reduce		DECIMAL,
	method_reduce		VARCHAR(10),
    money_after         DECIMAL,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE role(
    id                  BIGINT IDENTITY PRIMARY KEY,
    role_name           NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE account(
    username            VARCHAR(100) PRIMARY KEY,
    role_id             BIGINT FOREIGN KEY(role_id) REFERENCES role(id),
    full_name           NVARCHAR(100),
    dob                 DATETIME,
    gender              BIT,
    phone_number        VARCHAR(15),
    email               VARCHAR(100),
    id_no               VARCHAR(15) UNIQUE,
    avatar              VARCHAR(MAX),
    password            NVARCHAR(100),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME  
)

CREATE TABLE address(
    id                  BIGINT IDENTITY PRIMARY KEY,
	fullName			NVARCHAR(100),
	SDT					VARCHAR(15),
	EMAIL				VARCHAR(200),
    city                NVARCHAR(100),
    district            NVARCHAR(100),
    ward                NVARCHAR(100),
    street              NVARCHAR(100),
    description_detail  NVARCHAR(MAX),
	defaultaddress		BIT,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE address_detail(
    id                  BIGINT IDENTITY PRIMARY KEY,
    account_id          VARCHAR(100) FOREIGN KEY(account_id) REFERENCES account(username),
    address_id          BIGINT FOREIGN KEY(address_id) REFERENCES address(id),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE bill(
    id                  BIGINT IDENTITY PRIMARY KEY,
    bill_code           VARCHAR(20) UNIQUE,
    account_id          VARCHAR(100) FOREIGN KEY(account_id) REFERENCES account(username),
    date_of_receipt     DATETIME,
    completion_date     DATETIME,
    price               DECIMAL,
    price_reduce        DECIMAL,
    bill_type           VARCHAR(50),
    note                NVARCHAR(MAX),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME    
)

CREATE TABLE delivery_note(
    id                  BIGINT IDENTITY PRIMARY KEY,
    bill_id             BIGINT FOREIGN KEY(bill_id) REFERENCES bill(id),
    address_id          BIGINT FOREIGN KEY(address_id) REFERENCES address(id),
    name                NVARCHAR(100),
    number_phone        NVARCHAR(15),
    createtion_date     DATETIME,
    ship_date           DATETIME,
    date_of_receipt     DATETIME,
    ship_price          DECIMAL,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE time_line(
    id                  BIGINT IDENTITY PRIMARY KEY,
    bill_id             BIGINT FOREIGN KEY(bill_id) REFERENCES bill(id),
    note                NVARCHAR(100),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME    
)


CREATE TABLE bill_detail(
    id                  BIGINT IDENTITY PRIMARY KEY,
    bill_id             BIGINT FOREIGN KEY(bill_id) REFERENCES bill(id),
    product_detail_id   BIGINT FOREIGN KEY(product_detail_id) REFERENCES product_detail(id),
    price               DECIMAL,
    quantity            INT,
    note                NVARCHAR(MAX),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE payment(
    id                  BIGINT IDENTITY PRIMARY KEY,
    payment_name        NVARCHAR(50),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME    
)

CREATE TABLE payment_detail(
    id                  BIGINT IDENTITY PRIMARY KEY,
    bill_id             BIGINT FOREIGN KEY(bill_id) REFERENCES bill(id),
    payment_id          BIGINT FOREIGN KEY(payment_id) REFERENCES payment(id),
    price               DECIMAL,
    date                DATETIME,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE voucher(
    id                  BIGINT IDENTITY PRIMARY KEY,
    voucher_code        VARCHAR(50) UNIQUE,
    voucher_name        NVARCHAR(100),
    start_date          DATETIME,
    end_date            DATETIME,
    voucher_value       DECIMAL,
    voucher_value_max   DECIMAL,
    voucher_method      VARCHAR(50),
    voucher_condition   DECIMAL,
    limit_quantity      INT,
    private             VARCHAR(15),
    is_send_email       BIT,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME 
)

CREATE TABLE voucher_account(
    id                  BIGINT IDENTITY PRIMARY KEY,
    account_id          VARCHAR(100) FOREIGN KEY(account_id) REFERENCES account(username),
    voucher_id          BIGINT FOREIGN KEY(voucher_id) REFERENCES voucher(id),
    percent_reduce      DECIMAL,
    money_reduce        DECIMAL,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME     
)

CREATE TABLE voucher_history(
    id                  BIGINT IDENTITY PRIMARY KEY,
    bill_id             BIGINT FOREIGN KEY(bill_id) REFERENCES bill(id),
    voucher_code        VARCHAR(50),
    price_reduce        DECIMAL,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME     
)

CREATE TABLE cart(
    id                  BIGINT IDENTITY PRIMARY KEY,
    account_id          VARCHAR(100) FOREIGN KEY(account_id) REFERENCES account(username),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME        
)

CREATE TABLE cart_detail(
    id                  BIGINT IDENTITY PRIMARY KEY,
    cart_id             BIGINT FOREIGN KEY(cart_id) REFERENCES cart(id),
    product_detail_id   BIGINT FOREIGN KEY(product_detail_id) REFERENCES product_detail(id),
    quantity            INT,
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME    
)

CREATE TABLE favorites_list(
    id                  BIGINT IDENTITY PRIMARY KEY,
    account_id          VARCHAR(100) FOREIGN KEY(account_id) REFERENCES account(username),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME   
) 

CREATE TABLE favorites_list_detail(
    id                  BIGINT IDENTITY PRIMARY KEY,
    favorite_list_id    BIGINT FOREIGN KEY(favorite_list_id) REFERENCES favorites_list(id),
    product_detail_id   BIGINT FOREIGN KEY(product_detail_id) REFERENCES product_detail(id),
    status              VARCHAR(50),
    created_at          DATETIME,
    updated_at          DATETIME,
    created_by          NVARCHAR(50),
    updated_by          NVARCHAR(50),
    deleted_at          DATETIME    
)