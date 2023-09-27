package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.request.cart.CartRequest;
import com.fpoly.ooc.responce.cart.CartResponse;

import java.util.List;

public interface CartDetailService {

    List<CartResponse> getAll();

    Cart createCartDetail(CartRequest request);

    CartDetail updateCartDetail(Long id, CartRequest request);

    void deleteCartDetail(Long id);

}
