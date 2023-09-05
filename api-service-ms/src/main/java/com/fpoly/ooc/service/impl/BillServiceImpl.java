package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.repository.interfaces.BillDetailRepo;
import com.fpoly.ooc.repository.interfaces.BillRepo;
import com.fpoly.ooc.responce.BillResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Override
    public Page<BillResponse> getAll(Integer pageNo, Integer size) {
        return null;
    }

    public Bill createBillWithCartItems(List<CartDetail> cartItems) {
        Bill bill = new Bill();

        Bill savedBill = billRepo.save(bill);

        // Tạo mục hóa đơn cho từng sản phẩm trong giỏ hàng
        for (CartDetail cartItem : cartItems) {
            BillDetail billDetail = new BillDetail();
            billDetail.setBill(savedBill);
            billDetail.setProductDetail());
            billDetail.setQuantity(cartItem.getQuantity());
            // Thiết lập thông tin khác cho mục hóa đơn

            // Lưu mục hóa đơn vào cơ sở dữ liệu
            billDetailRepo.save(billDetail);
        }

        return savedBill;

    }
}
