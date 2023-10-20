package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.entity.Payment;
import com.fpoly.ooc.entity.PaymentDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.DeliveryNoteRepo;
import com.fpoly.ooc.repository.PaymentDetailRepo;
import com.fpoly.ooc.repository.TimeLineRepo;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private PaymentDetailRepo paymentDetailRepo;

    @Autowired
    private TimeLineRepo timeLineRepo;

    @Autowired
    private DeliveryNoteRepo deliveryNoteRepo;


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Bill createBill(BillRequest request) {
        Account accountBuilder = null;

        if (request.getAccountId() != null) {
            accountBuilder = Account.builder().username(request.getAccountId()).build();
        }

        Bill bill = Bill.builder()
                .account(accountBuilder)
                .priceReduce(request.getPriceReduce())
                .price(request.getPrice())
                .amountPaid(request.getAmountPaid())
                .billType(request.getBillType())
                .transactionCode(request.getTransactionCode())
                .symbol(request.getSymbol())
                .note(request.getNote())
                .billCode(request.getBillCode())
                .completionDate(LocalDateTime.now())
                .build();
        billRepo.save(bill);

        for (BillDetailRequest billDetailRequest : request.getLstBillDetailRequest()) {
            BillDetail billDetail = BillDetail.builder()
                    .bill(bill)
                    .productDetail(ProductDetail.builder().id(billDetailRequest.getProductDetailId()).build())
                    .price(billDetailRequest.getPrice())
                    .quantity(billDetailRequest.getQuantity())
                    .note("null")
                    .status("UNPAID")
                    .build();
            billDetailRepo.save(billDetail);
        }

        PaymentDetail paymentDetail = PaymentDetail.builder()
                .bill(bill)
                .payment(Payment.builder().id(request.getPaymentDetailId()).build())
                .build();
        paymentDetailRepo.save(paymentDetail);

        DeliveryNote deliveryNote = DeliveryNote.builder()
                .bill(bill)
                .address(request.getAddressId() == null ? null :
                        Address.builder().id(request.getAddressId()).build())
                .name(request.getFullname())
                .phoneNumber(request.getPhoneNumber())
                .shipDate(request.getShipDate())
                .shipPrice(request.getShipPrice())
                .build();
        deliveryNoteRepo.save(deliveryNote);

        for (int i = 0; i < 2; i++) {
            String n = String.valueOf((i + 1));
            Timeline timeline = new Timeline();
            timeline.setBill(bill);
            timeline.setStatus(n);
            timeLineRepo.save(timeline);
        }

        return bill;
    }

    @Override
    public List<BillManagementResponse> getAllBillManagement(
            String billCode,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String status,
            String billType,
            String symbol) {
        return billRepo.getAllBillManagement(billCode,
                startDate, endDate, status, billType, symbol);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteBill(Long id) {
        Bill bill = billRepo.findById(id).orElse(null);
        if (bill == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        billRepo.deleteById(id);
    }

    @Override
    public List<GetListCustomer> getListCustomer() {
        return billRepo.getListCustomer();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Integer updateBillStatus(BillStatusDTO dto, Long id) {
        billRepo.update(dto.getStatus(), id);
        return 1;
    }

    @Override
    public List<Address> getListAddressByUserName(String username) {
        return billRepo.getListAddressByUsername(username);
    }

    @Override
    public Bill findBillByBillId(Long id) {
        return billRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
    }
}
