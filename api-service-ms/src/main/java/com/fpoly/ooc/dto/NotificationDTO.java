package com.fpoly.ooc.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NotificationDTO {
    private Long billId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime orderDate;
    private String orderStatus;
    private String productName;
    private String brandName;
    private String categoryName;
    private Integer quantity;
    private BigDecimal price;
    private String imageDefault;

    public NotificationDTO(Long billId, LocalDateTime orderDate, String orderStatus, String productName,
                           String brandName, String categoryName, Integer quantity, BigDecimal price,
                           String imageDefault) {
        this.billId = billId;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.productName = productName;
        this.brandName = brandName;
        this.categoryName = categoryName;
        this.quantity = quantity;
        this.price = price;
        this.imageDefault = imageDefault;
    }
}
