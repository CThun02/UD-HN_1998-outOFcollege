package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.repository.CartDetailRepo;
import com.fpoly.ooc.repository.CartRepo;
import com.fpoly.ooc.request.CartDetailRequest;
import com.fpoly.ooc.request.CartRequest;
import com.fpoly.ooc.responce.CartResponse;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartDetailRepo cartDetailRepo;

    @Override
    public List<CartResponse> getAll() {
        return cartDetailRepo.getAllCart();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Cart createCartDetail(CartRequest request) {
        Cart cart = new Cart();

        for (CartDetailRequest cartDetailRequest : request.getLstCartDetail()) {
            CartDetail cartDetail = CartDetail.builder()
                    .productDetail(ProductDetail.builder()
                            .id(cartDetailRequest.getProductDetailId())
                            .build())
                    .cart(cart)
                    .quantity(cartDetailRequest.getQuantity())
                    .build();

            cartDetailRepo.save(cartDetail);
        }

        return cartRepo.save(cart);
    }

    @Override
    public CartDetail updateCartDetail(Long id, CartRequest request) {
        return null;
    }

    @Override
    public void deleteCartDetail(Long id) {
         cartDetailRepo.deleteById(id);
    }
}
