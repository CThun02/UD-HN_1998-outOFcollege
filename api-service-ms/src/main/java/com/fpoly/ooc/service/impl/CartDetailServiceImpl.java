package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.PriceCartUserDTO;
import com.fpoly.ooc.dto.PromotionProductDetailDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.CartDetailRepo;
import com.fpoly.ooc.repository.CartRepo;
import com.fpoly.ooc.request.bill.BillDetailRequest;
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
import com.fpoly.ooc.service.interfaces.PromotionProductDetailService;
import com.fpoly.ooc.service.interfaces.PromotionService;
import com.fpoly.ooc.util.CommonUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    @Autowired
    private PromotionProductDetailService promotionProductDetailService;

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
    public CartDetailDisplayResponse getProductDetailId(Long productDetailId, Integer quantity, String username) throws NotFoundException {
        CartDetailDisplayResponse cartDetailDisplayResponse = null;
        List<CartDetailResponse> lstCartDetailResponse = cartDetailRepo.getProductDetailId(productDetailId);
        ProductDetail productDetail = productDetailService.findProductDetailByIdAndStatus(productDetailId);
        if (quantity > productDetail.getQuantity()) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
        }

        for (int i = 0; i < lstCartDetailResponse.size(); i++) {
            List<ProductImageResponse> lstImageResponse = productImageService
                    .getProductImageByProductDetailId(lstCartDetailResponse.get(i).getProductDetailId());

            List<PromotionProductResponse> lstPromotion = promotionService
                    .getPromotionByProductDetailId(lstCartDetailResponse.get(i).getProductDetailId(), Const.STATUS_ACTIVE);
            PromotionProductResponse res = CommonUtils.getOneElementsInArrays(lstPromotion);
            if (Objects.nonNull(res)) {
                double priceProduct = CommonUtils.bigDecimalConvertDouble(lstCartDetailResponse.get(i).getPriceProductDetail());
                double promotionValue = CommonUtils.bigDecimalConvertDouble(res.getPromotionValue());
                if ("%".equalsIgnoreCase(res.getPromotionMethod())) {
                    priceProduct = priceProduct - (priceProduct * (promotionValue / 100));
                } else {
                    priceProduct = priceProduct - promotionValue;
                }

                if (quantity * priceProduct > 10000000) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_THAN_TEN_MILLION));
                }
            } else {
                double priceProduct = CommonUtils.bigDecimalConvertDouble(productDetail.getPrice());
                if (quantity * priceProduct > 10000000) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_THAN_TEN_MILLION));
                }
            }
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

        double totalPrice = 0d;
        for (CartDetailRequest cartDetailRequest : request.getLstCartDetail()) {
            boolean found = false;
            for (CartDetail existingCartDetail : existingCart.getCartDetailList()) {
                ProductDetail productDetail = productDetailService.findProductDetailByIdAndStatus(existingCartDetail.getProductDetail().getId());
                if (Objects.isNull(productDetail) ||
                        existingCartDetail.getQuantity() + cartDetailRequest.getQuantity() > productDetail.getQuantity()) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_ADD_TO_CART_THAN_QUANTITY));
                }

                if (existingCartDetail.getProductDetail().getId().equals(cartDetailRequest.getProductDetailId())) {
                    int quantityUpdateCart = existingCartDetail.getQuantity() + cartDetailRequest.getQuantity();
                    double priceProduct = CommonUtils.bigDecimalConvertDouble(productDetail.getPrice());

                    if (quantityUpdateCart * priceProduct > 10000000) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_THAN_TEN_MILLION));
                    }

                    totalPrice += quantityUpdateCart * priceProduct;
                    existingCartDetail.setQuantity(quantityUpdateCart);
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

        if (totalPrice > 10000000) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_THAN_TEN_MILLION));
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
                return null;
            }

            if (Objects.isNull(cartDetail.getProductDetail().getQuantity()) || quantity > cartDetail.getProductDetail().getQuantity()) {
                cartDetailRepo.delete(cartDetail);
                return null;
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

    @Override
    public void updateProductInCart(String username, List<BillDetailRequest> billDetailRequestList) {
        if (StringUtils.isBlank(username) || CollectionUtils.isEmpty(billDetailRequestList)) {
            return;
        }

        List<Long> productDetailId = billDetailRequestList.stream().map(BillDetailRequest::getProductDetailId).collect(Collectors.toList());

        List<CartDetail> lstCartDetail = cartDetailRepo.findAllCartDetailByUser(username, productDetailId);
        if(CollectionUtils.isEmpty(lstCartDetail)) {
            return;
        }

        List<Long> productDetailIdInCart = lstCartDetail.stream().map((e) -> {
            if (Objects.isNull(e.getProductDetail())) {
                return -1L;
            }
            return e.getProductDetail().getId();
        }).toList();

        boolean isCompare = productDetailId.removeAll(productDetailIdInCart);

        if (!isCompare) {
            return;
        }

        for (CartDetail p1: lstCartDetail) {
            for (BillDetailRequest p2: billDetailRequestList) {
                if (Objects.nonNull(p1.getProductDetail()) && p1.getProductDetail().getId().equals(p2.getProductDetailId())) {
                    int quantityUpdate = p1.getQuantity() - p2.getQuantity();
                    p1.setQuantity(quantityUpdate);
                    if (p1.getQuantity() > 0) {
                        cartDetailRepo.save(p1);
                    } else {
                        cartDetailRepo.delete(p1);
                    }
                }
            }
        }
    }

    @Override
    public PriceCartUserDTO getTotalPriceCartByUser(String username) throws NotFoundException {
        if (StringUtils.isBlank(username)) {
           throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        PriceCartUserDTO priceCartUserDTO = new PriceCartUserDTO();

        List<CartDetail> lstCartDetail = cartDetailRepo.findCartDetailByUsername(username);
        if (CollectionUtils.isEmpty(lstCartDetail)) {
           return null;
        }

        List<Long> lstProductDetailId = lstCartDetail.stream().map(e -> {
            if (Objects.nonNull(e.getProductDetail())) {
                return e.getProductDetail().getId();
            }
            return -1L;
        }).toList();

        double totalPrice = 0d;
        for (CartDetail cartDetail: lstCartDetail) {
            PromotionProductDetailDTO dto = null;
            ProductDetail productDetail = null;
            if (Objects.nonNull(cartDetail.getProductDetail())) {
                productDetail = productDetailService.findProductDetailByIdAndStatus(cartDetail.getProductDetail().getId());
                dto = promotionProductDetailService.findPromotionByProductDetailIds(List.of(cartDetail.getProductDetail().getId()));
            }
            if (Objects.isNull(dto)) {
                continue;
            }
            double priceProduct = CommonUtils.bigDecimalConvertDouble(productDetail.getPrice());
            double promotionPrice = CommonUtils.bigDecimalConvertDouble(dto.getPromotionValue());
            double priceReduce = 0d;
            if(Objects.nonNull(dto.getPromotionMethod()) && Objects.nonNull(dto.getPromotionValue())) {
                if ("%".equalsIgnoreCase(dto.getPromotionMethod())) {
                    priceReduce = priceProduct * promotionPrice / 100;
                } else {
                    priceReduce = promotionPrice;
                }
            }

            totalPrice += (priceProduct - priceReduce) * cartDetail.getQuantity();
        }
        priceCartUserDTO.setTotalPrice(new BigDecimal(totalPrice));
        priceCartUserDTO.setQuantityCartDetail(lstCartDetail.size());
        return priceCartUserDTO;
    }

}
