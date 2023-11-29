package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.ProductReturn;
import com.fpoly.ooc.repository.ProductReturnRepository;
import com.fpoly.ooc.request.product.ProductReturnRequest;
import com.fpoly.ooc.service.interfaces.ProductReturnServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductReturnService implements ProductReturnServiceI {
    @Autowired
    ProductReturnRepository repo;

    @Override
    public ProductReturn create(ProductReturnRequest request) {
        ProductReturn productReturn = request.dto();
        productReturn.setReason(request.getReason()== null?"OTHER":"PRODUCE");
        return repo.save(productReturn);
    }
}
