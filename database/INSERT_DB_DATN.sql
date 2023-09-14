﻿USE MASTER;

CREATE DATABASE DATN_DB_MS;

USE DATN_DB_MS;

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
    button_id           BIGINT FOREIGN KEY(button_id) REFERENCES button_type(id),
    material_id         BIGINT FOREIGN KEY(material_id) REFERENCES material(id),
    collar_id           BIGINT FOREIGN KEY(collar_id) REFERENCES collar_type(id),
    sleeve_id           BIGINT FOREIGN KEY(sleeve_id) REFERENCES sleeve_type(id),
    size_id             BIGINT FOREIGN KEY(size_id) REFERENCES size(id),
    color_id            BIGINT FOREIGN KEY(color_id) REFERENCES color(id),
    form_id             BIGINT FOREIGN KEY(form_id) REFERENCES form(id),
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
    product_detail_id   BIGINT FOREIGN KEY(product_detail_id) REFERENCES product_detail(id) ,
    path                VARCHAR(MAX),
    status              VARCHAR(50),
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
    promotion_max_value  DECIMAL,
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
    city                NVARCHAR(100),
    district            NVARCHAR(100),
    ward                NVARCHAR(100),
    street              NVARCHAR(100),
    description_detail  NVARCHAR(MAX),
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
    account_id          VARCHAR(100) FOREIGN KEY(account_id) REFERENCES account(username),
    date_of_receipt     DATETIME,
    completion_date     DATETIME,
    price               DECIMAL,
    price_reduce        DECIMAL,
    bill_type           VARCHAR(50),
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



INSERT INTO promotion (promotion_code, promotion_name, promotion_value, start_date, end_date, promotion_max_value, promotion_method, promotion_condition, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
('PROMO001', N'Giảm giá 10%', 10, '2023-09-01', '2023-09-30', 100, 'Discount', 50, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('PROMO002', N'Giảm giá 20%', 20, '2023-09-15', '2023-10-15', 200, 'Discount', 100, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
('PROMO003', N'Free shipping', NULL, '2023-10-01', '2023-12-31', NULL, 'Shipping', 0, 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
('PROMO004', N'Giảm giá 15%', 15, '2023-09-10', '2023-10-10', 150, 'Discount', 75,'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('PROMO005', N'Miễn phí 1 sản phẩm', NULL, '2023-09-20', '2023-09-30', NULL, 'FreeItem', 0, 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);

select * from promotion

INSERT INTO material (material_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Cotton', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Linen', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Silk', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Polyester', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Denim', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from material

INSERT INTO brand (brand_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Gentleman Attire', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Classic Men', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Tailored Elegance', 'InACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Sophisticated Style', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Fashionable Gent', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);

select * from brand

INSERT INTO color (color_code, color_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
('C001', N'Red', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('C002', N'Blue', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
('C003', N'Green', 'InACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
('C004', N'Yellow', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('C005', N'Orange', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from color

INSERT INTO pattern (pattern_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Striped Oxford Shirt', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Checked Flannel Shirt', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Plain White Dress Shirt', 'InACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Dotted Chambray Shirt', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Geometric Print Shirt', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from pattern

INSERT INTO size (size_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'S', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'M', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'L', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'XL', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'XXL', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from size

INSERT INTO sleeve_type (seleeve_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Long Sleeve', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Short Sleeve', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Roll-up Sleeve', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Convertible Sleeve', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'French Cuff', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from sleeve_type

INSERT INTO button_type (button_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Standard Button', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'French Button', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Snap Button', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Hidden Button', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Cufflink Button', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from button_type

INSERT INTO form (form_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Slim Fit', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Regular Fit', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Classic Fit', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Slim Fit Stretch', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Tailored Fit', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from form

INSERT INTO shirt_tail_type (shirt_tail_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Straight Hem', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Curved Hem', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Round Hem', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Split Hem', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Shirttail Hem', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from shirt_tail_type

INSERT INTO collar_type (collar_type_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Standard Collar', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Spread Collar', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Button-Down Collar', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Spread Button-Down Collar', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Mandarin Collar', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from collar_type

INSERT INTO category (category_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Casual', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Dress', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Formal', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Shirtjacket', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Sport', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from category

INSERT INTO payment (payment_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Cash', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Credit Card', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'PayPal', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'Bank Transfer', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Google Pay', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from payment

INSERT INTO role (role_name, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(N'Admin', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'User', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'Admin', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(N'User', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Admin', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from role

INSERT INTO product (brand_id, category_id, product_code, product_name, description, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(1, 1, N'P001', N'Shirt A', N'This is a stylish shirt.', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 1, N'P002', N'Shirt B', N'This shirt offers great comfort.', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(3, 2, N'P003', N'Pants A', N'These pants are suitable for any occasion.', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(2, 2, N'P004', N'Pants B', N'These pants are made of high-quality fabric.', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 3, N'P005', N'Shoes A', N'These shoes provide excellent support.', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from product

INSERT INTO voucher (voucher_code, voucher_name, start_date, end_date, voucher_value, voucher_value_max, voucher_method, voucher_condition, limit_quantity, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
('DISCOUNT10', N'Discount 10%', '2023-09-01', '2023-09-30', 10, 100, 'Percentage', 50, 100, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('FREESHIP', N'Free Shipping', '2023-09-15', '2023-09-30', 0, NULL, 'Fixed', 0, 50, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
('FLASH20', N'Flash Sale 20%', '2023-09-10', '2023-09-12', 20, 50, 'Percentage', 100, 200, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('NEWCUST10', N'New Customer Discount', '2023-09-01', '2023-12-31', 10, 100, 'Percentage', 0, NULL, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('HOLIDAY25', N'Holiday Special', '2023-12-15', '2024-01-01', 25, 0, 'Fixed', 150, 1000, 'ACTIVE', '2023-12-15', '2023-12-15', N'Admin', N'Admin', NULL);
select * from voucher

INSERT INTO account (username, role_id, full_name, dob, gender, phone_number, email, id_no, password, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', 1, N'Hannah Johnson', '1990-05-15', 0, '1234567890', 'user1@example.com', 'A12345678', '123456', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', 2, N'Michael Smith', '1985-12-20', 1, '9876543210', 'user2@example.com', 'B98765432', '234567', 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', 3, N'Emma Davis', '1995-08-10', 0, '5558889999', 'user3@example.com', 'C76543210', '345678', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', 2, N'Sophia Wilson', '1992-04-15', 1, '7778889999', 'user4@example.com', 'D54321098', '456789', 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', 1, N'Oliver Thompson','1992-04-04' , 1, '1231231234', 'user5@example.com', 'E98765432', '445566', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from account

INSERT INTO cart (account_id, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', 'Pending', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', 'Completed', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', 'Pending', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', 'Cancelled', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', 'Pending', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from	cart

INSERT INTO favorites_list (account_id, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', 'InACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', 'InACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from favorites_list

INSERT INTO address (city, district, ward, street, description_detail, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(N'Hanoi', N'Hoan Kiem', N'Hang Bong', N'123 Street', N'Description for address 1', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'Ho Chi Minh City', N'District 1', N'Ben Nghe', N'456 Street', N'Description for address 2', 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(N'Da Nang', N'Hai Chau', N'Thanh Khe Dong', N'789 Street', N'Description for address 3', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(N'Hanoi', N'Dong Da', N'Thanh Cong', N'987 Street', N'Description for address 4', 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(N'Ho Chi Minh City', N'District 2', N'An Phu', N'321 Street', N'Description for address 5', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from address

INSERT INTO address_detail (account_id, address_id, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', 1, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', 2, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', 3, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', 4, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', 5, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from address_detail
INSERT INTO bill (account_id, date_of_receipt, completion_date, price, price_reduce, bill_type, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', '2023-09-01', '2023-09-05', 100.00, 10.00, 'Online', 'Completed', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', '2023-09-05', '2023-09-10', 150.00, 15.00, 'In-store', 'Completed', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', '2023-09-10', '2023-09-15', 200.00, 20.00, 'Online', 'Pending', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', '2023-09-12', '2023-09-17', 120.00, 12.00, 'In-store', 'Completed', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', '2023-09-15', '2023-09-20', 180.00, 18.00, 'Online', 'Pending', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from bill

INSERT INTO delivery_note (bill_id, address_id, name, number_phone, createtion_date, ship_date, date_of_receipt, ship_price, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, N'John Doe', N'1234567890', '2023-09-01', '2023-09-05', '2023-09-10', 10.99, 'Delivered', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, N'Jane Smith', N'9876543210', '2023-09-05', '2023-09-10', '2023-09-15', 8.99, 'In Transit', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, N'Michael Johnson', N'5555555555', '2023-09-10', '2023-09-15', '2023-09-20', 12.99, 'Pending', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, N'Sarah Williams', N'1111111111', '2023-09-12', '2023-09-17', '2023-09-22', 9.99, 'Delivered', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, N'David Brown', N'9999999999', '2023-09-15', '2023-09-20', '2023-09-25', 11.99, 'In Transit', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from delivery_note

INSERT INTO time_line (bill_id, note, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, N'Order placed', 'Processing', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, N'Preparing for shipment', 'Processing', '2023-09-02', '2023-09-02', N'Admin', N'Admin', NULL),
(3, N'Shipped', 'In Transit', '2023-09-03', '2023-09-03', N'Admin', N'Admin', NULL),
(1, N'Out for delivery', 'In Transit', '2023-09-04', '2023-09-04', N'Admin', N'Admin', NULL),
(4, N'Delivered', 'Completed', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL);
select * from time_line

INSERT INTO payment_detail (bill_id, payment_id, price, date, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 50.00, '2023-09-01', 'Paid', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 75.00, '2023-09-05', 'Paid', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 100.00, '2023-09-10', 'Pending', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 60.00, '2023-09-12', 'Paid', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 90.00, '2023-09-15', 'Pending', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from payment_detail

INSERT INTO voucher_account (account_id, voucher_id, percent_reduce, money_reduce, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', 1, 10.00, 0.00, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', 2, 0.00, 5.00, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', 3, 15.00, 0.00, 'InACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', 4, 0.00, 8.00, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', 5, 20.00, 0.00, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from voucher_account

INSERT INTO voucher_history (bill_id, voucher_code, price_reduce, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 'VOUCHER001', 10.00, 'Applied', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 'VOUCHER002', 5.00, 'Applied', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 'VOUCHER003', 0.00, 'Not Applied', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 'VOUCHER004', 8.00, 'Applied', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 'VOUCHER005', 0.00, 'Not Applied', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from voucher_history

INSERT INTO product_detail (product_id, pattern_id, button_id, material_id, collar_id, sleeve_id, size_id, color_id, form_id, shirt_tail_id, price, quantity, description_detail, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 50.00, 10, N'Soft and comfortable fabric', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 75.00, 15, N'Stylish and trendy design', 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 100.00, 20, N'High-quality material', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 60.00, 12, N'Classic and elegant design', 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 90.00, 8, N'Various color options available', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from product_detail

INSERT INTO promotion_product_detail (promotion_id, product_detail_id, percent_reduce, money_after, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 10.00, 45.00, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 15.00, 63.75, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 20.00, 80.00, 'InACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 25.00, 45.00, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 30.00, 63.00, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from promotion_product_detail

INSERT INTO product_image (product_detail_id, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from product_image

INSERT INTO favorites_list_detail (favorite_list_id, product_detail_id, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from favorites_list_detail

INSERT INTO bill_detail (bill_id, product_detail_id, price, quantity, note, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 50.00, 2, N'No special notes', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 75.00, 1, N'Wrap as a gift', 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 100.00, 3, N'Deliver to customer address', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 60.00, 2, N'Express shipping requested', 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 90.00, 1, N'Customer requested color: Blue', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from bill_detail

INSERT INTO cart_detail (cart_id, product_detail_id, quantity, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 2, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 1, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 3, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 2, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 1, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from cart_detail