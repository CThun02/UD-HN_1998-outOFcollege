package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.common.SimpleSendProductDetail;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.UpdateQuantityProductDetailDTO;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/bill-detail")
public class BillDetailController {

    @Autowired
    private BillDetailService billDetailService;
    @Autowired
    private SimpleSendProductDetail simpleSendProductDetail;
    @Autowired
    private ProductDetailServiceI productDetailServiceI;

    @PostMapping("/create-bill-detail")
    public ResponseEntity<?> createdBillDetail(@RequestBody BillDetailRequest request) throws JsonProcessingException, NotFoundException {
        if (Objects.isNull(request)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        BillDetail billDetail = billDetailService.createBillDetail(request);
        request.setBillDetailId(billDetail.getId());

        ProductDetail productDetail = productDetailServiceI.findProductDetailByIdAndStatus(request.getProductDetailId());

        if (Objects.nonNull(productDetail)) {
            ProductDetailRequest req = new ProductDetailRequest();
            UpdateQuantityProductDetailDTO dto = new UpdateQuantityProductDetailDTO();
            dto.setRequest(req);
            dto.setProductDetail(productDetail);
            simpleSendProductDetail.updateQuantityRealtime(dto);
        }

        return ResponseEntity.ok("ok");
    }

    @PutMapping()
    public ResponseEntity<?> updateBillDetail(@RequestBody BillDetailRequest request) throws JsonProcessingException, NotFoundException {
        return ResponseEntity.ok(billDetailService.updateBillDetail(request));
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteBillDetail(@RequestParam("billId") Long billId,
                                              @RequestParam("billDetailId") Long billDetailId) throws JsonProcessingException, NotFoundException {
        BillDetail billDetail = billDetailService.deleteBillDetail(billId, billDetailId);
        if (Objects.nonNull(billDetail)) {
            ProductDetailRequest req = new ProductDetailRequest();
            UpdateQuantityProductDetailDTO dto = new UpdateQuantityProductDetailDTO();
            dto.setProductDetail(billDetail.getProductDetail());
            dto.setQuantityCurrent(Objects.nonNull(billDetail.getProductDetail()) ? billDetail.getProductDetail().getQuantity() : 0);
            dto.setQuantityUpdate(0);
            dto.setRequest(req);
            simpleSendProductDetail.updateQuantityRealtime(dto);
        }

        return ResponseEntity.ok(billDetail);
    }

}
