package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.request.DeliveryNoteRequest;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface DeliveryNoteService {

    DeliveryNote createDeliveryNote(DeliveryNoteRequest request);

    DeliveryNote getDeliveryNoteByBill_Id(Long billId);

    DeliveryNote updateShippingPrice(Long billId, BigDecimal price, LocalDateTime shipDate);
}
