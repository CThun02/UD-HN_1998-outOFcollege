package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ProductReturn;
import com.fpoly.ooc.request.product.ProductReturnRequest;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductReturnServiceI {
    ProductReturn create(ProductReturnRequest request);
    public List<ProductDetailDisplayResponse> getProductReturnByDateAndReason(LocalDateTime day, LocalDateTime dayTo, String reason);

}
