package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.UpdateShippingPriceDeliveryDTO;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.responce.deliveryNote.DeliveryNoteResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface DeliveryNoteService {

    DeliveryNote createDeliveryNote(DeliveryNoteRequest request);

    DeliveryNote createDeliveryNote(DeliveryNote deliveryNote);

    DeliveryNote getDeliveryNoteByBill_Id(Long billId);

    DeliveryNote updateShippingPrice(Long billId, BigDecimal price, LocalDateTime shipDate) throws NotFoundException;

    DeliveryNoteResponse getOne(String billCode);

    Boolean updateShippingPrice(UpdateShippingPriceDeliveryDTO dto) throws NotFoundException;

}
