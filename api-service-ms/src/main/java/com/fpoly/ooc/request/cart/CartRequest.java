package com.fpoly.ooc.request.cart;

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

    private String username;

    private List<CartDetailRequest> LstCartDetail;


}
