USE DATN_DB_MS;

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
('#CC0000', N'Red', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('#99CCFF', N'Blue', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
('#99FF99', N'Green', 'InACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
('#FFFF33', N'Yellow', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('#FFCC66', N'Orange', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
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
(N'EMPLOYEE', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(N'CUSTOMER', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(N'ADMIN', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL)
select * from role

INSERT INTO product (brand_id, category_id, pattern_id, form_id, product_code, product_name, description, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES
(1, 1, 1, 1, N'P001', N'Shirt A', N'This is a stylish shirt.', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 1, 2, 2, N'P002', N'Shirt B', N'This shirt offers great comfort.', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL),
(3, 2, 3, 3, N'P003', N'Pants A', N'These pants are suitable for any occasion.', 'ACTIVE', '2023-10-01', '2023-10-01', N'Admin', N'Admin', NULL),
(2, 2, 4, 5, N'P004', N'Pants B', N'These pants are made of high-quality fabric.', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 3, 5, 4, N'P005', N'Shoes A', N'These shoes provide excellent support.', 'ACTIVE', '2023-09-20', '2023-09-20', N'Admin', N'Admin', NULL);
select * from product

INSERT INTO voucher (voucher_code, voucher_name, start_date, end_date, voucher_value, voucher_value_max, voucher_method, voucher_condition, limit_quantity, status, created_at, updated_at, created_by, updated_by, deleted_at, private)
VALUES
('DISCOUNT10', N'Discount 10%', '2023-09-01', '2023-09-30', 10, 100, 'Percentage', 50, 100, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL, 'all'),
('FREESHIP', N'Free Shipping', '2023-09-15', '2023-09-30', 0, NULL, 'Fixed', 0, 50, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL, 'member'),
('FLASH20', N'Flash Sale 20%', '2023-09-10', '2023-09-12', 20, 50, 'Percentage', 100, 200, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL, 'all'),
('NEWCUST10', N'New Customer Discount', '2023-09-01', '2023-12-31', 10, 100, 'Percentage', 0, NULL, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL, 'member'),
('HOLIDAY25', N'Holiday Special', '2023-12-15', '2024-01-01', 25, 0, 'Fixed', 150, 1000, 'ACTIVE', '2023-12-15', '2023-12-15', N'Admin', N'Admin', NULL, 'member');
select * from voucher

INSERT INTO account (username, role_id, full_name, dob, gender, phone_number, email, id_no, password, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', 1, N'Hannah Johnson', '1990-05-15', 0, '1234567890', 'tuanpaph26902@fpt.edu.vn', 'A12345678', '123456', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', 2, N'Michael Smith', '1985-12-20', 1, '9876543210', 'kienptph26901@fpt.edu.vn', 'B98765432', '234567', 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', 3, N'Emma Davis', '1995-08-10', 0, '5558889999', 'thuanctph26631@fpt.edu.vn', 'C76543210', '345678', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', 2, N'Sophia Wilson', '1992-04-15', 1, '7778889999', 'anpvph26925@fpt.edu.vn', 'D54321098', '456789', 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', 1, N'Oliver Thompson','1992-04-04' , 1, '1231231234', 'email@gmail.com', 'E98765432', '445566', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
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
INSERT INTO bill (account_id, date_of_receipt, completion_date, price, price_reduce, bill_type,note, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
('user1', '2023-09-01', '2023-09-05', 100.00, 10.00, 'Online', 'Completed','ABC', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
('user2', '2023-09-05', '2023-09-10', 150.00, 15.00, 'In-store', 'Completed','XYZ', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
('user3', '2023-09-10', '2023-09-15', 200.00, 20.00, 'Online', 'Pending','An ngu', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
('user4', '2023-09-12', '2023-09-17', 120.00, 12.00, 'In-store', 'Completed','New', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
('user5', '2023-09-15', '2023-09-20', 180.00, 18.00, 'Online', 'Pending','VIP', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from bill

INSERT INTO delivery_note (bill_id, address_id, name, number_phone, createtion_date, ship_date, date_of_receipt, ship_price, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(6, 1, N'John Doe', N'1234567890', '2023-09-01', '2023-09-05', '2023-09-10', 10.99, 'Delivered', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, N'Jane Smith', N'9876543210', '2023-09-05', '2023-09-10', '2023-09-15', 8.99, 'In Transit', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, N'Michael Johnson', N'5555555555', '2023-09-10', '2023-09-15', '2023-09-20', 12.99, 'Pending', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, N'Sarah Williams', N'1111111111', '2023-09-12', '2023-09-17', '2023-09-22', 9.99, 'Delivered', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, N'David Brown', N'9999999999', '2023-09-15', '2023-09-20', '2023-09-25', 11.99, 'In Transit', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from delivery_note

INSERT INTO time_line (bill_id, note, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(6, N'Order placed', 'Processing', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, N'Preparing for shipment', 'Processing', '2023-09-02', '2023-09-02', N'Admin', N'Admin', NULL),
(3, N'Shipped', 'In Transit', '2023-09-03', '2023-09-03', N'Admin', N'Admin', NULL),
(5, N'Out for delivery', 'In Transit', '2023-09-04', '2023-09-04', N'Admin', N'Admin', NULL),
(4, N'Delivered', 'Completed', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL);
select * from time_line

INSERT INTO payment_detail (bill_id, payment_id, price, date, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(6, 1, 50.00, '2023-09-01', 'Paid', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
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
(6, 'VOUCHER001', 10.00, 'Applied', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 'VOUCHER002', 5.00, 'Applied', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 'VOUCHER003', 0.00, 'Not Applied', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 'VOUCHER004', 8.00, 'Applied', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 'VOUCHER005', 0.00, 'Not Applied', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from voucher_history

INSERT INTO product_detail (product_id, button_id, material_id, collar_id, sleeve_id, size_id, color_id, shirt_tail_id, price, quantity, description_detail, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 1, 1, 1, 1, 1, 1, 50.00, 10, N'Soft and comfortable fabric', 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 2, 2, 2, 2, 2, 2, 75.00, 15, N'Stylish and trendy design', 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 3, 3, 3, 3, 3, 3, 100.00, 20, N'High-quality material', 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 4, 4, 4, 4, 4, 4, 60.00, 12, N'Classic and elegant design', 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 5, 5, 5, 5, 5, 5, 90.00, 8, N'Various color options available', 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from product_detail

INSERT INTO promotion_product_detail (promotion_id, product_detail_id, percent_reduce, money_after, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 10.00, 45.00, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 15.00, 63.75, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 20.00, 80.00, 'InACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 25.00, 45.00, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 30.00, 63.00, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from promotion_product_detail

INSERT INTO favorites_list_detail (favorite_list_id, product_detail_id, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from favorites_list_detail

INSERT INTO bill_detail (bill_id, product_detail_id, price, quantity, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(6, 1, 50.00, 2, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 75.00, 1, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 100.00, 3, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 60.00, 2,  'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 90.00, 1,  'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from bill_detail

INSERT INTO cart_detail (cart_id, product_detail_id, quantity, status, created_at, updated_at, created_by, updated_by, deleted_at)
VALUES 
(1, 1, 2, 'ACTIVE', '2023-09-01', '2023-09-01', N'Admin', N'Admin', NULL),
(2, 2, 1, 'ACTIVE', '2023-09-05', '2023-09-05', N'Admin', N'Admin', NULL),
(3, 3, 3, 'ACTIVE', '2023-09-10', '2023-09-10', N'Admin', N'Admin', NULL),
(4, 4, 2, 'ACTIVE', '2023-09-12', '2023-09-12', N'Admin', N'Admin', NULL),
(5, 5, 1, 'ACTIVE', '2023-09-15', '2023-09-15', N'Admin', N'Admin', NULL);
select * from cart_detail