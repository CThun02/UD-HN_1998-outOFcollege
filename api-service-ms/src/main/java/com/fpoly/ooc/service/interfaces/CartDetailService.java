package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.request.CartRequest;

import java.util.List;

public interface CartDetailService {

    List<Cart> getAll();

    Cart createCartDetail(CartRequest request);

    CartDetail updateCartDetail(Long id, CartRequest request);

    void deleteCartDetail(Long id);

}
