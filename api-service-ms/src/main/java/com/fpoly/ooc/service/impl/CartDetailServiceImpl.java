package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.repository.interfaces.CartDetailRepo;
import com.fpoly.ooc.repository.interfaces.CartRepo;
import com.fpoly.ooc.request.CartRequest;
import com.fpoly.ooc.responce.CartResponse;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    @Autowired
    private CartDetailRepo cartDetailRepo;

    @Autowired
    private CartRepo cartRepo;

    @Override
    public Page<CartResponse> getAll(Integer pageNo, Integer size) {
        return cartDetailRepo.getAllCart(PageRequest.of(pageNo, size));
    }

    @Override
    public CartDetail createCartDetail(CartRequest request) {

        Cart cart = Cart.builder()
                .account(Account.builder()
                        .username(request
                                .getAccountId() == null ? null : request.getAccountId())
                        .build())
                .status("active")
                .build();

        cartRepo.save(cart);

        CartDetail cartDetail = CartDetail.builder()
                .cart(cart)
                .productDetail(ProductDetail.builder().id(request.getProductDetailId()).build())
                .status("waiting bill")
                .quantity(request.getQuantity())
                .build();

        return cartDetailRepo.save(cartDetail);
    }

    @Override
    public CartDetail updateCartDetail(Long id, CartRequest request) {
        CartDetail cartDetail = cartDetailRepo.findById(id).orElse(null);
        if (cartDetail == null){
            throw new IllegalArgumentException("");
        }

        return null;
    }

    @Override
    public void deleteCartDetail(Long id) {

    }


}
