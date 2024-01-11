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
import com.fpoly.ooc.responce.cart.CartIndexResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.PromotionService;
import com.fpoly.ooc.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Autowired
    private ProductDetailServiceI productDetailService;

    @Override
    public List<CartDetailDisplayResponse> getAllCart(String username) throws NotFoundException {
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

    @Override
    public CartDetailDisplayResponse getProductDetailId(Long productDetailId) {
        CartDetailDisplayResponse cartDetailDisplayResponse = null;
        List<CartDetailResponse> lstCartDetailResponse = cartDetailRepo.getProductDetailId(productDetailId);

        for (int i = 0; i < lstCartDetailResponse.size(); i++) {
            List<ProductImageResponse> lstImageResponse = productImageService
                    .getProductImageByProductDetailId(lstCartDetailResponse.get(i).getProductDetailId());

            List<PromotionProductResponse> lstPromotion = promotionService
                    .getPromotionByProductDetailId(lstCartDetailResponse.get(i).getProductDetailId(), "ACTIVE");
            cartDetailDisplayResponse = new CartDetailDisplayResponse();
            cartDetailDisplayResponse.setCartDetailResponse(lstCartDetailResponse.get(i));
            cartDetailDisplayResponse.setProductImageResponse(lstImageResponse);
            cartDetailDisplayResponse.setPromotion(lstPromotion);

        }

        return cartDetailDisplayResponse;
    }

    @Transactional
    @Override
    public Cart createCartDetail(CartRequest request) throws NotFoundException {
        Account account = accountService.findLoginByUsername(request.getUsername());
        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        Cart existingCart = cartRepo.findCartByAccount(account);

        if (Objects.isNull(existingCart)) {
            existingCart = this.createCart(account.getUsername());
        }

        for (CartDetailRequest cartDetailRequest : request.getLstCartDetail()) {
            boolean found = false;
            for (CartDetail existingCartDetail : existingCart.getCartDetailList()) {
                if (existingCartDetail.getProductDetail().getId().equals(cartDetailRequest.getProductDetailId())) {
                    ProductDetail productDetail = productDetailService.findProductDetailByIdAndStatus(existingCartDetail.getProductDetail().getId());

                    if (Objects.isNull(productDetail) ||
                            existingCartDetail.getQuantity() + cartDetailRequest.getQuantity() > productDetail.getQuantity()) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_ADD_TO_CART_THAN_QUANTITY));
                    }

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

    @Transactional
    @Override
    public Cart createCart(String username) throws NotFoundException {
        Account account = accountService.findLoginByUsername(username);
        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        Cart existingCart = cartRepo.findCartByAccount(account);
        if (existingCart != null) {
            return null;
        } else {
            Cart cart = Cart.builder()
                    .account(account)
                    .cartDetailList(new ArrayList<>())
                    .build();
            return cartRepo.save(cart);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public CartDetail updateQuantity(Long cartDetailId, Integer quantity) throws NotFoundException {
        CartDetail cartDetail = cartDetailRepo.findById(cartDetailId)
                .orElseThrow(() -> new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));

        if (Objects.nonNull(cartDetail.getProductDetail())) {
            double price = CommonUtils.bigDecimalConvertDouble(cartDetail.getProductDetail().getPrice());
            if (price * quantity > 10000000) {
                double newQuantityUpdate = 10000000 / price;
                cartDetail.setQuantity((int)newQuantityUpdate);
                cartDetailRepo.save(cartDetail);
                throw new NotFoundException(Const.ERROR_BILL_THAN_TEN_MILLION);
            }
        }

        cartDetail.setQuantity(quantity);
        return cartDetailRepo.save(cartDetail);
    }

    @Transactional
    @Override
    public CartDetail deleteProductDetailFromCart(Long cartDetailId) throws NotFoundException {
        CartDetail cartDetail = cartDetailRepo.findById(cartDetailId)
                .orElseThrow(() -> new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
        cartDetailRepo.deleteById(cartDetailId);
        return cartDetail;
    }

    @Override
    public CartIndexResponse getCartIndexz(String username) {
        return cartRepo.getCartIndex(username);
    }

    @Override
    public Boolean deleteProductInCartFromUser(String username, Long cartDetailId) throws NotFoundException {
        Account account = accountService.findByUsername(username);

        if (Objects.isNull(account)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        List<CartDetail> cartDetailList = cartDetailRepo.findAllCartDetailByUser(username, cartDetailId);
        CartDetail cartDetail = CommonUtils.getOneElementsInArrays(cartDetailList);

        if (Objects.nonNull(cartDetail)) {
            cartDetailRepo.delete(cartDetail);
        }

        return null;
    }

}
