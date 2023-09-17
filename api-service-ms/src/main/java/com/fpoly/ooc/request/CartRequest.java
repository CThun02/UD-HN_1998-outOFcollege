package com.fpoly.ooc.request;

import com.fpoly.ooc.entity.CartDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartRequest {

    private Long cartId;

    private String accountId;

    private Long productDetailId;

    private Integer quantity;

    private List<CartDetailRequest> LstCartDetail;


}
