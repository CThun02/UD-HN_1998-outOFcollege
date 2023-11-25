package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.request.DeliveryNoteRequest;

public interface DeliveryNoteService {

    DeliveryNote createDeliveryNote(DeliveryNoteRequest request);
    DeliveryNote getDeliveryNoteByBill_Id(Long billId);

}
