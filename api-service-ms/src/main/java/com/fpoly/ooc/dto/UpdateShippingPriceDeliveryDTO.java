package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateShippingPriceDeliveryDTO {
    private Long billId;
    private String shippingPrice;
}
