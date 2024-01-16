package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.UpdateShippingPriceDeliveryDTO;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.DeliveryNoteRepo;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.responce.deliveryNote.DeliveryNoteResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.util.CommonUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class DeliveryNoteServiceImpl implements DeliveryNoteService {

    @Autowired
    private DeliveryNoteRepo deliveryNoteRepo;

    @Autowired
    private BillRepo billRepo;

    @Override
    public DeliveryNote createDeliveryNote(DeliveryNoteRequest request) throws NotFoundException {
        if (Objects.isNull(request)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        Bill bill = billRepo.findById(request.getBillId()).orElse(null);
        if (Objects.isNull(bill)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        double price = CommonUtils.bigDecimalConvertDouble(bill.getPrice());
        BigDecimal shippingPrice = BigDecimal.ZERO;
        if (price < 2000000) {
            shippingPrice = request.getShipPrice();
        }

        DeliveryNote deliveryNote = DeliveryNote.builder()
                .bill(Bill.builder().id(request.getBillId()).build())
                .address(Address.builder().id(request.getAddressId()).build())
                .name(request.getName())
                .phoneNumber(request.getPhoneNumber())
                .shipPrice(shippingPrice)
                .shipDate(request.getShipDate())
                .dateOfReceipt(request.getDateOfreceipt())
                .build();

        return deliveryNoteRepo.save(deliveryNote);
    }

    @Override
    public DeliveryNote createDeliveryNote(DeliveryNote deliveryNote) {
        if (Objects.nonNull(deliveryNote)) {
            return deliveryNoteRepo.save(deliveryNote);
        }
        return null;
    }

    @Override
    public DeliveryNote getDeliveryNoteByBill_Id(Long billId) {
        return deliveryNoteRepo.getDeliveryNoteByBill_Id(billId);
    }

    @Override
    public DeliveryNote updateShippingPrice(Long billId, BigDecimal price, LocalDateTime shipDate) throws NotFoundException {
        DeliveryNote deliveryNote = deliveryNoteRepo.getDeliveryNoteByBill_Id(billId);
        Bill bill = billRepo.findById(billId).orElse(null);
        if (Objects.isNull(bill)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }
        if (!"wait_for_confirm".equalsIgnoreCase(bill.getStatus())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_CANNOT_EDIT_WHEN_BILL_NOT_EQUAL_WAIT_FOR_CONFIRM));
        }

        if (price.compareTo(deliveryNote.getShipPrice()) != 0) {
            double newPriceShipping = CommonUtils.bigDecimalConvertDouble(price);
            double shippingPrice = 0d;
            double priceBill = CommonUtils.bigDecimalConvertDouble(bill.getPrice());
            double priceReduce = CommonUtils.bigDecimalConvertDouble(bill.getPriceReduce());
            double amountPaid = priceBill - priceReduce + newPriceShipping;
            bill.setAmountPaid(new BigDecimal(amountPaid));
            shippingPrice = newPriceShipping;
            billRepo.save(bill);
            deliveryNote.setShipPrice(new BigDecimal(shippingPrice));
            deliveryNote.setShipDate(shipDate);
            return deliveryNoteRepo.save(deliveryNote);
        }

        return null;
    }

    @Override
    public DeliveryNoteResponse getOne(String billCode) {
        return deliveryNoteRepo.getOne(billCode);
    }

    @Override
    public Boolean updateShippingPrice(UpdateShippingPriceDeliveryDTO dto) throws NotFoundException {
        if (Objects.isNull(dto)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SERVICE));
        }

        List<DeliveryNote> deliveryNoteList = deliveryNoteRepo.findAllDeliveryNoteByBillId(dto.getBillId());
        DeliveryNote deliveryNote = CommonUtils.getOneElementsInArrays(deliveryNoteList);
        if (Objects.isNull(deliveryNote)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
        }

        if (StringUtils.isBlank(dto.getShippingPrice())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_SHIPPING_PRICE_NOT_EMPTY));
        }

        String replacePrice = dto.getShippingPrice().replace(",", "");
        BigDecimal newPrice = new BigDecimal(replacePrice);
        if (deliveryNote.getShipPrice().equals(newPrice)) {
            return false;
        }

        Bill bill = billRepo.findById(dto.getBillId()).orElse(null);

        if (Objects.isNull(bill) || !"wait_for_confirm".equalsIgnoreCase(bill.getStatus())) {
            return false;
        }

        double price = CommonUtils.bigDecimalConvertDouble(bill.getPrice());
        double priceReduce = CommonUtils.bigDecimalConvertDouble(bill.getPriceReduce());
        double newShippingPrice = CommonUtils.bigDecimalConvertDouble(newPrice);

        bill.setAmountPaid(new BigDecimal(price + newShippingPrice - priceReduce));
        billRepo.save(bill);

        deliveryNote.setShipPrice(newPrice);
        deliveryNoteRepo.save(deliveryNote);
        return true;
    }


}
