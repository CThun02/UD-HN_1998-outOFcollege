package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.repository.DeliveryNoteRepo;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.responce.deliveryNote.DeliveryNoteResponse;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class DeliveryNoteServiceImpl implements DeliveryNoteService {

    @Autowired
    private DeliveryNoteRepo deliveryNoteRepo;

    @Override
    public DeliveryNote createDeliveryNote(DeliveryNoteRequest request) {
        DeliveryNote deliveryNote = DeliveryNote.builder()
                .bill(Bill.builder().id(request.getBillId()).build())
                .address(Address.builder().id(request.getAddressId()).build())
                .name(request.getName())
                .phoneNumber(request.getPhoneNumber())
                .shipPrice(request.getShipPrice())
                .shipDate(request.getShipDate())
                .dateOfReceipt(request.getDateOfreceipt())
                .build();

        return deliveryNoteRepo.save(deliveryNote);
    }

    @Override
    public DeliveryNote getDeliveryNoteByBill_Id(Long billId) {
        return deliveryNoteRepo.getDeliveryNoteByBill_Id(billId);
    }

    @Override
    public DeliveryNote updateShippingPrice(Long billId, BigDecimal price, LocalDateTime shipDate) {
        DeliveryNote deliveryNote = deliveryNoteRepo.getDeliveryNoteByBill_Id(billId);
        deliveryNote.setShipPrice(price);
        deliveryNote.setShipDate(shipDate);
        return deliveryNoteRepo.save(deliveryNote);
    }

    @Override
    public DeliveryNoteResponse getOne(String billCode) {
        return deliveryNoteRepo.getOne(billCode);
    }


}
