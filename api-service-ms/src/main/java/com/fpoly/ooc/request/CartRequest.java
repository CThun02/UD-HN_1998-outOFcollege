package com.fpoly.ooc.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CartRequest {

    private Long cartId;

    private String accountId;

    private Long productDetailId;

    private Integer quantity;

}
