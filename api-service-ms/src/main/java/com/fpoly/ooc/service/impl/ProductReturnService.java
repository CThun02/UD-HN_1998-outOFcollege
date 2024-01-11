package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.ProductReturn;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.ProductReturnRepository;
import com.fpoly.ooc.request.product.ProductReturnRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.service.interfaces.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductReturnService implements ProductReturnServiceI {
    ProductReturnRepository repo;
    BillService billService;
    ProductDetailServiceI productDetailService;
    ProductImageServiceI productImageService;
    VoucherHistoryService voucherHistoryService;
    BillDetailService billDetailService;

    @Autowired
    public ProductReturnService(ProductReturnRepository repo, BillService billService, ProductDetailServiceI productDetailService, ProductImageServiceI productImageService, VoucherHistoryService voucherHistoryService, BillDetailService billDetailService) {
        this.repo = repo;
        this.billService = billService;
        this.productDetailService = productDetailService;
        this.productImageService = productImageService;
        this.voucherHistoryService = voucherHistoryService;
        this.billDetailService = billDetailService;
    }

    @Override
    public ProductReturn create(ProductReturnRequest request){
        ProductReturn productReturn = request.dto();
        BillDetail billDetail = null;
        try {
            billDetail = billDetailService.findBillDetailsByPDIdAndBillId(request.getProductDetailId(), request.getBillId()).get(0);
        } catch (NotFoundException e) {
            e.printStackTrace();
            return null;
        }
        if(billDetail.getQuantity()==request.getQuantity()){
            billDetail.setStatus("ReturnS");
            billDetailService.saveOrUpdate(billDetail);
        }else{
            billDetail.setQuantity(billDetail.getQuantity()- request.getQuantity());
            billDetailService.saveOrUpdate(billDetail);
            BillDetail billDetailReturn = BillDetail.builder()
                    .productDetail(ProductDetail.builder().id(request.getProductDetailId()).build())
                    .bill(Bill.builder().id(request.getBillId()).build())
                    .note(request.getNote())
                    .price(request.getPrice())
                    .status("ReturnS")
                    .quantity(request.getQuantity())
                    .build();
            billDetailService.saveOrUpdate(billDetailReturn);
        }
        if(productReturn.getStatus().equals("OTHER")){
            ProductDetail productDetail = productDetailService.getOne(request.getProductDetailId());
            productDetail.setQuantity(productDetail.getQuantity() + request.getQuantity());
            try {
                productDetailService.update(productDetail);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            } catch (NotFoundException e) {
                e.printStackTrace();
            }
        }
        return repo.save(productReturn);
    }

    @Override
    public List<ProductDetailDisplayResponse> getProductReturnByDateAndReason(LocalDateTime day, LocalDateTime dayTo, String reason) {
        List<ProductDetailDisplayResponse> productDetailDisplayResponses = new ArrayList<>();
        List<ProductDetailResponse> productDetailResponses = repo.getProductReturnByDateAndReason(day, dayTo, reason);
        for (int i = 0; i < productDetailResponses.size(); i++) {
            ProductDetailDisplayResponse productDetailDisplayResponse = new ProductDetailDisplayResponse(productDetailResponses.get(i),
                    productImageService.getProductImageByProductDetailId(productDetailResponses.get(i).getId()));
            productDetailDisplayResponse.setPrice(repo.sumPriceByPdId(productDetailResponses.get(i).getId(), reason));
            productDetailDisplayResponse.setQuantity(repo.sumQuantityByPdId(productDetailResponses.get(i).getId(), reason));
            productDetailDisplayResponses.add(productDetailDisplayResponse);
        }
        return productDetailDisplayResponses;
    }

    @Override
    public List<ProductDetailDisplayResponse> getProductReturnByBillCode(String billCode) {
        List<ProductDetailDisplayResponse> productDetailDisplayResponses = new ArrayList<>();
        List<ProductDetailResponse> productDetailResponses = repo.getProductReturnByBillCode(billCode);
        for (int i = 0; i < productDetailResponses.size(); i++) {
            ProductDetailDisplayResponse productDetailDisplayResponse = new ProductDetailDisplayResponse(productDetailResponses.get(i),
                    productImageService.getProductImageByProductDetailId(productDetailResponses.get(i).getId()));
            productDetailDisplayResponses.add(productDetailDisplayResponse);
        }
        return productDetailDisplayResponses;
    }

    @Override
    public List<ProductDetailDisplayResponse> getProductReturnDetailByProductDetailId(Long productDetailId, String reason) {
        List<ProductDetailDisplayResponse> productDetailDisplayResponses = new ArrayList<>();
        List<ProductDetailResponse> productDetailResponses = repo.getProductReturnDetailByProductDetailId(productDetailId, reason);
        for (int i = 0; i < productDetailResponses.size(); i++) {
            ProductDetailDisplayResponse productDetailDisplayResponse = new ProductDetailDisplayResponse(productDetailResponses.get(i),
                    productImageService.getProductImageByProductDetailId(productDetailResponses.get(i).getId()));
            productDetailDisplayResponses.add(productDetailDisplayResponse);
        }
        return productDetailDisplayResponses;
    }
}
