package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.ProductReturn;
import com.fpoly.ooc.repository.ProductReturnRepository;
import com.fpoly.ooc.request.product.ProductReturnRequest;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductReturnServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ProductReturnService implements ProductReturnServiceI {
    ProductReturnRepository repo;
    BillService billService;
    ProductDetailServiceI productDetailService;

    @Autowired
    public ProductReturnService(ProductReturnRepository repo, BillService billService, ProductDetailServiceI productDetailService) {
        this.repo = repo;
        this.billService = billService;
        this.productDetailService = productDetailService;
    }

    @Override
    public ProductReturn create(ProductReturnRequest request) {
        ProductReturn productReturn = request.dto();
        productReturn.setReason(request.getReason()== null?"PRODUCE":"OTHER");
        Bill bill = billService.findBillByBillId(request.getBillId());
        bill.setPrice(bill.getPrice().subtract(request.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()))));
        billService.updateBill(bill);
        if(productReturn.getReason().equals("OTHER")){
            ProductDetail productDetail = productDetailService.getOne(request.getProductDetailId());
            productDetail.setQuantity(productDetail.getQuantity() + request.getQuantity());
            productDetailService.update(productDetail);
        }
        return repo.save(productReturn);
    }
}
