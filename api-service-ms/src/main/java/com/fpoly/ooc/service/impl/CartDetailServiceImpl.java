package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.repository.interfaces.CartDetailRepo;
import com.fpoly.ooc.request.CartRequest;
import com.fpoly.ooc.responce.CartResponse;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    @Autowired
    private CartDetailRepo cartDetailRepo;

    @Override
    public Page<CartResponse> getAll() {
        return cartDetailRepo.getAllCart();
    }

    @Override
    public CartDetail createCartDetail(CartRequest request) {
        CartDetail cartDetail = CartDetail.builder()
                .cart(Cart.builder()
                        .account(Account.builder().userName(request.getAccountId()).build())
                        .status("active")
                        .build())
                .productDetail(ProductDetail.builder().id(request.getProductDetailId()).build())
                .status("active")
                .quantity(request.getQuantity())
                .build();

        return cartDetail;
    }
}
