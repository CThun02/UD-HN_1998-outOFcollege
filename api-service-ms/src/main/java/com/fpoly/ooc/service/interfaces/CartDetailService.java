package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.request.cart.CartRequest;
import com.fpoly.ooc.responce.cart.CartDetailDisplayResponse;
import com.fpoly.ooc.responce.cart.CartIndexResponse;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartDetailService {

    List<CartDetailDisplayResponse> getAllCart(String username);

    Cart createCartDetail(CartRequest request);

    Cart createCart(String username);

    CartDetail updateQuantity(Long cartDetailId, Integer quantity);

    CartDetail deleteProductDetailFromCart(Long cartDetailId);

    CartIndexResponse getCartIndexz(String username);

}
