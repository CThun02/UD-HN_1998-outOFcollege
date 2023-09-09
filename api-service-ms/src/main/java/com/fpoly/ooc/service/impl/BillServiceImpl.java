package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.repository.interfaces.BillDetailRepo;
import com.fpoly.ooc.repository.interfaces.BillRepo;
import com.fpoly.ooc.repository.interfaces.CartDetailRepo;
import com.fpoly.ooc.repository.interfaces.CartRepo;
import com.fpoly.ooc.request.BillRequest;
import com.fpoly.ooc.responce.BillResponse;
import com.fpoly.ooc.responce.CartResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartDetailRepo cartDetailRepo;

    @Override
    public Page<BillResponse> getAll(Integer pageNo, Integer size) {
        return null;
    }

    @Override
    public BillDetail createBill(BillRequest request) {
        Account accountBuilder = null;
        BillDetail billDetail = null;

        if (request.getAccountId() != null) {
            accountBuilder = Account.builder().username(request.getAccountId()).build();
        }
        Bill bill = Bill.builder()
                .account(accountBuilder)
                .billType("sale counter")
                .build();

        billRepo.save(bill);

        for (CartResponse cart : cartRepo.getAll()) {
            billDetail = BillDetail.builder()
                    .quantity(cart.getQuantity())
                    .bill(bill)
                    .price(cart.getPrice())
                    .status("active")
                    .build();

            billDetailRepo.save(billDetail);
            cartRepo.deleteById(cart.getCartId());
            cartDetailRepo.deleteById(cart.getCartDetailId());
        }
        return billDetail;
    }

    @Override
    public Bill updateBill(Long id, BillRequest request) {
        return null;
    }

    @Override
    public void deleteBill(Long id) {

    }
}
