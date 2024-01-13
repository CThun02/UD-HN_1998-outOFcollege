package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.PriceCartUserDTO;
import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.request.cart.CartRequest;
import com.fpoly.ooc.responce.cart.CartDetailDisplayResponse;
import com.fpoly.ooc.responce.cart.CartIndexResponse;

import java.util.List;

public interface CartDetailService {

    List<CartDetailDisplayResponse> getAllCart(String username) throws NotFoundException;

    CartDetailDisplayResponse getProductDetailId(Long productDetailId, Integer quantity, String username) throws NotFoundException;

    Cart createCartDetail(CartRequest request) throws NotFoundException;

    Cart createCart(String username) throws NotFoundException;

    CartDetail updateQuantity(Long cartDetailId, Integer quantity) throws NotFoundException;

    CartDetail deleteProductDetailFromCart(Long cartDetailId) throws NotFoundException;

    CartIndexResponse getCartIndexz(String username);

    Boolean deleteProductInCartFromUser(String username, Long cartDetailId) throws NotFoundException;

    void updateProductInCart(String username, List<BillDetailRequest> lstProductDetailId);

    PriceCartUserDTO getTotalPriceCartByUser(String username) throws NotFoundException;

    Boolean deleteAllCartDetailFromUsername(String username) throws NotFoundException;

}
