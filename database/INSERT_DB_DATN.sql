INSERT INTO product (product_code, product_name, status)
VALUES ('P001', N'Áo sơ mi dài tay', 'ACTIVE'),
       ('P002', N'Áo sơ mi ngắn tay', 'ACTIVE'),
	   ('P003', N'Áo sơ mi oxford', 'ACTIVE'),
	   ('P004', N'Áo sơ mi dài thêu', 'ACTIVE'),
	   ('P005', N'Áo sơ mi cổ trụ', 'ACTIVE'),
	   ('P006', N'Áo sơ mi kẻ sọc', 'ACTIVE'),
	   ('P007', N'Áo sơ mi lụa', 'ACTIVE'),
	   ('P008', N'Áo sơ mi nhung tăm', 'ACTIVE');

insert into brand(brand_name, status)
values  (N'Gucci','ACTIVE'),
		(N'Atino','ACTIVE'),
		(N'Owen','ACTIVE'),
		(N'Zara','ACTIVE'),
		(N'Uniqlo','ACTIVE');

insert into category(category_name, status)
values(N'Cổ điển', 'ACTIVE'),
(N'Denim','ACTIVE'),
(N'Oxford','ACTIVE'),
(N'Flennel','ACTIVE'),
(N'Len','ACTIVE');

insert into pattern(pattern_name, status)
values(N'Họa tiết caro','ACTIVE'),
(N'Họa tiết hoa','ACTIVE'),
(N'Họa tiết chấm bi','ACTIVE'),
(N'Họa tiết sọc ngang','ACTIVE'),
(N'Họa tiết đối xứng','ACTIVE');

select * from form
insert into form(form_name, status)
values(N'Dáng áo ôm sát', 'ACTIVE'),
(N'Dáng áo thoải mái', 'ACTIVE'),
(N'Dáng áo rộng', 'ACTIVE'),
(N'Dáng áo ôm nhẹ', 'ACTIVE'),
(N'Dáng áo thể thao', 'ACTIVE');

insert into button_type(button_name, status)
values(N'Nút áo bình thường ', 'ACTIVE'),
(N'Nút áo tròn', 'ACTIVE'),
(N'Nút áo kim loại', 'ACTIVE'),
(N'Nút áo màu sắc', 'ACTIVE'),
(N'Nút áo vuông', 'ACTIVE');

insert into material(material_name, status)
values(N'Chất liệu cotton', 'ACTIVE'),
(N'Chất liệu linen', 'ACTIVE'),
(N'Chất liệu denim', 'ACTIVE'),
(N'Chất liệu flannel', 'ACTIVE'),
(N'Chất liệu silk', 'ACTIVE');

insert into collar_type(collar_type_name, status)
values(N'Cổ bẻ', 'ACTIVE'),
(N'Cổ tròn', 'ACTIVE'),
(N'Cổ veston', 'ACTIVE'),
(N'Cổ vát', 'ACTIVE'),
(N'Cổ truyền thống', 'ACTIVE');

insert into sleeve_type (seleeve_name, status)
values(N'Tay dài', 'ACTIVE'),
(N'Tay ngắn', 'ACTIVE'),
(N'Tay bo bản', 'ACTIVE'),
(N'Tay bồng', 'ACTIVE'),
(N'Tay cộc', 'ACTIVE');

insert into shirt_tail_type(shirt_tail_name, status)
values(N'Đuôi áo cong', 'ACTIVE'),
(N'Đuôi áo thẳng', 'ACTIVE'),
(N'Đuôi áo cắt cúp', 'ACTIVE'),
(N'Đuôi áo dài', 'ACTIVE'),
(N'Đuôi áo bình thường', 'ACTIVE');

insert into size(size_name, status)
values('S', 'ACTIVE'),
('M', 'ACTIVE'),
('L', 'ACTIVE'),
('XL', 'ACTIVE'),
('XXL', 'ACTIVE');

insert into color(color_code, color_name, status)
values('#007FFF',N'Xanh biển','ACTIVE'),
('#00FF00',N'Xanh lá','ACTIVE'),
('#FF0000',N'Đỏ','ACTIVE'),
('#FFFF00',N'Vàng','ACTIVE'),
('#FFA500',N'Cam','ACTIVE');


insert into product_detail(product_id, brand_id, category_id, pattern_id, form_id, button_id, material_id, collar_id, 
sleeve_id, shirt_tail_id, size_id, color_id, price, quantity, weight, status)
values(1,1,1,1,1,1,1,1,1,1,1,1,100000, 100,200, 'ACTIVE'),	
(1,1,1,1,1,1,1,1,1,1,1,2,100000, 50, 200, 'ACTIVE'),	
(1,1,1,1,1,1,1,1,1,1,1,3,200000, 50, 200, 'ACTIVE'),	
(1,1,1,1,1,1,1,1,1,1,1,4,150000, 60, 200, 'ACTIVE'),	
(1,1,1,1,1,1,1,1,1,1,1,5,300000, 70, 200, 'ACTIVE'),	
(2,1,1,2,2,2,2,2,2,2,2,1,100000, 90, 200, 'ACTIVE'),	
(2,1,1,1,1,1,1,1,1,1,3,1,100000, 100, 200, 'ACTIVE'),	
(2,1,1,1,1,1,1,1,1,1,4,1,100000, 60, 200, 'ACTIVE'),	
(2,1,1,1,1,1,1,1,1,1,5,1,230000, 55, 200, 'ACTIVE'),
(3,1,1,1,1,1,1,1,1,1,1,1,100000, 80, 200, 'ACTIVE'),
(3,1,1,1,1,1,1,1,1,1,2,2,200000, 80, 200, 'ACTIVE'),
(3,1,1,1,1,1,1,1,1,1,2,3,300000, 80, 200, 'ACTIVE'),
(3,1,1,1,1,1,1,1,1,1,3,4,400000, 80, 200, 'ACTIVE'),
(3,1,1,1,1,1,1,1,1,1,1,5,500000, 80, 200, 'ACTIVE'),
(4,1,1,1,1,1,1,1,1,1,1,1,250000, 80, 200, 'ACTIVE'),
(4,1,1,1,1,1,1,1,1,1,1,2,150000, 50, 200, 'ACTIVE'),
(4,1,1,1,1,1,1,1,1,1,1,4,250000, 50, 200, 'ACTIVE'),
(4,1,1,1,1,1,1,1,1,1,1,3,350000, 50, 200, 'ACTIVE'),
(4,1,1,1,1,1,1,1,1,1,1,5,100000, 50, 200, 'ACTIVE'),
(5,1,1,1,1,1,1,1,1,1,2,1,200000, 50, 200, 'ACTIVE'),
(5,1,1,1,1,1,1,1,1,1,3,1,100000, 50, 200, 'ACTIVE'),
(5,1,1,1,1,1,1,1,1,1,4,1,200000, 50, 200, 'ACTIVE'),
(5,1,1,1,1,1,1,1,1,1,5,1,300000, 50, 200, 'ACTIVE'),
(5,1,1,1,1,1,1,1,1,1,1,2,400000, 100, 200, 'ACTIVE'),
(6,1,1,1,1,1,1,1,1,1,1,1,100000, 100, 200, 'ACTIVE'),
(6,1,1,1,1,1,1,1,1,1,1,2,150000, 50, 200, 'ACTIVE'),
(6,1,1,1,1,1,1,1,1,1,1,3,150000, 50, 200, 'ACTIVE'),
(6,1,1,1,1,1,1,1,1,1,1,4,600000, 50, 200, 'ACTIVE'),
(6,1,1,1,1,1,1,1,1,1,1,5,550000, 50, 200, 'ACTIVE'),
(7,1,1,1,1,1,1,1,1,1,1,1,100000, 50, 200, 'ACTIVE'),
(7,1,1,1,1,1,1,1,1,1,1,2,200000, 50, 200, 'ACTIVE'),
(7,1,1,1,1,1,1,1,1,1,1,3,300000, 50, 200, 'ACTIVE'),
(7,1,1,1,1,1,1,1,1,1,1,4,400000, 50, 200, 'ACTIVE'),
(7,1,1,1,1,1,1,1,1,1,1,5,500000, 50, 200, 'ACTIVE'),
(8,1,1,1,1,1,1,1,1,1,1,1,500000, 50, 200, 'ACTIVE'),
(8,1,1,1,1,1,1,1,1,1,2,1,100000, 50, 200, 'ACTIVE'),
(8,1,1,1,1,1,1,1,1,1,1,3,100000, 50, 200, 'ACTIVE'),
(8,1,1,1,1,1,1,1,1,1,4,1,200000, 50, 200, 'ACTIVE'),
(8,1,1,1,1,1,1,1,1,1,1,5,300000, 50, 200, 'ACTIVE');

insert into product_image(product_detail_id, path, status)
values(1,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(2,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(3,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(4,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(5,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(6,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(7,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(8,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(9,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(10,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(11,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(12,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(13,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(14,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(15,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(16,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(17,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(18,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(19,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(20,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(21,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(22,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(23,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(24,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(25,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(26,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(27,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(28,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(29,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20B%2FBlue%2F1700578447218Shirt_B221555131?alt=media&token=9973dcba-141a-4fea-9c5c-7fc1bab1e04b','ACTIVE'),
(30,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(31,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(32,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(33,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(34,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(35,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(36,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(37,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(38,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(39,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE'),
(40,'https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FPants%20B%2FRed%2F1700578136416Pants_B222421342?alt=media&token=a0d4cd96-15c7-4e4c-a215-fb127b996ed2','ACTIVE');

insert into payment(payment_name, status)
values('Cash','ACTIVE'),
('Credit Card', 'ACTIVE');

insert into role(role_name, status)
values('ROLE_ADMIN', 'ACTIVE'),
		('ROLE_CUSTOMER', 'ACTIVE'),
		('ROLE_EMPLOYEE', 'ACTIVE');

insert into account(username,full_name, role_id, dob, gender, phone_number, email, id_no, password, status)
values('admin', 'ADMIN',1,'09-09-2000',1,'0987654321','kienptph26901', '01828312832','123', 'ACTIVE'),
('usser', 'USER', 2,'09-09-2000',1,'0987654321','kienptph26901', '01828312852','123', 'ACTIVE'),
('employee','EMPLOYEE', 3,'09-09-2000',1,'0987654321','kienptph26901', '01828382832','123', 'ACTIVE')

