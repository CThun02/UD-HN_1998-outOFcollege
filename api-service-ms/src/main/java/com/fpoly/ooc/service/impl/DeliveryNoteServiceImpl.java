package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.repository.DeliveryNoteRepo;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryNoteServiceImpl implements DeliveryNoteService {

    @Autowired
    private DeliveryNoteRepo deliveryNoteRepo;

    @Override
    public DeliveryNote createDeliveryNote(DeliveryNoteRequest request) {
        DeliveryNote deliveryNote = DeliveryNote.builder()
                .bill(Bill.builder().id(request.getBillId()).build())
                .address(Address.builder().id(request.getAddressId()).build())
                .shipPrice(request.getShipPrice())
                .shipDate(request.getShipDate())
                .dateOfReceipt(request.getDateOfreceipt())
                .build();

        return deliveryNoteRepo.save(deliveryNote);
    }
}
