package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.CartDetailRepo;
import com.fpoly.ooc.repository.CartRepo;
import com.fpoly.ooc.request.cart.CartDetailRequest;
import com.fpoly.ooc.request.cart.CartRequest;
import com.fpoly.ooc.responce.cart.CartDetailDisplayResponse;
import com.fpoly.ooc.responce.cart.CartDetailResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import com.fpoly.ooc.service.interfaces.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartDetailRepo cartDetailRepo;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ProductImageService productImageService;

    @Autowired
    private PromotionService promotionService;

    @Override
    public List<CartDetailDisplayResponse> getAllCart(String username) {
        Account account = accountService.findLoginByUsername(username);
        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        List<CartDetailDisplayResponse> lst = new ArrayList();
        List<CartDetailResponse> lstCartDetailResponse = cartDetailRepo.getAllCart(username);

        for (int i = 0; i < lstCartDetailResponse.size(); i++) {
            List<ProductImageResponse> lstImageResponse = productImageService
                    .getProductImageByProductDetailId(lstCartDetailResponse.get(i).getProductDetailId());

            List<PromotionProductResponse> lstPromotion = promotionService
                    .getPromotionByProductDetailId(lstCartDetailResponse.get(i).getProductDetailId(), "ACTIVE");

            CartDetailDisplayResponse cartDetailDisplayResponse = new CartDetailDisplayResponse();
            cartDetailDisplayResponse.setCartDetailResponse(lstCartDetailResponse.get(i));
            cartDetailDisplayResponse.setProductImageResponse(lstImageResponse);
            cartDetailDisplayResponse.setPromotion(lstPromotion);

            lst.add(cartDetailDisplayResponse);
        }

        return lst;
    }

    @Transactional
    @Override
    public Cart createCartDetail(CartRequest request) {
        Account account = accountService.findLoginByUsername(request.getUsername());
        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        Cart existingCart = cartRepo.findCartByAccount(account);

            for (CartDetailRequest cartDetailRequest : request.getLstCartDetail()) {
                boolean found = false;

                for (CartDetail existingCartDetail : existingCart.getCartDetailList()) {
                    if (existingCartDetail.getProductDetail().getId().equals(cartDetailRequest.getProductDetailId())) {
                        existingCartDetail.setQuantity(existingCartDetail.getQuantity() + cartDetailRequest.getQuantity());
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    CartDetail cartDetail = CartDetail.builder()
                            .productDetail(ProductDetail.builder()
                                    .id(cartDetailRequest.getProductDetailId())
                                    .build())
                            .cart(existingCart)
                            .quantity(cartDetailRequest.getQuantity())
                            .build();

                    cartDetailRepo.save(cartDetail);
                }
        }

        return existingCart;
    }

    @Override
    public Cart createCart(String username) {
        Account account = accountService.findLoginByUsername(username);
        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        Cart cart = Cart.builder()
                .account(account)
                .cartDetailList(new ArrayList<>())
                .build();

        return cartRepo.save(cart);
    }

}
