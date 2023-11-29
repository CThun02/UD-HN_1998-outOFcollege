package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.ProductReturn;
import com.fpoly.ooc.request.product.ProductReturnRequest;

public interface ProductReturnServiceI {
    ProductReturn create(ProductReturnRequest request);
}
