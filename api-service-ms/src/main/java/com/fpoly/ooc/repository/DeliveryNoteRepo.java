package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.responce.deliveryNote.DeliveryNoteResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryNoteRepo extends JpaRepository<DeliveryNote, Long> {

    DeliveryNote getDeliveryNoteByBill_Id(Long billId);

    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.deliveryNote.DeliveryNoteResponse(dn.name, dn.phoneNumber," +
            "   dn.shipDate, dn.dateOfReceipt, dn.shipPrice, add.descriptionDetail, add.ward, add.district, add.city ) " +
            "FROM DeliveryNote dn JOIN Address add ON dn.address.id = add.id " +
            "WHERE dn.bill.billCode = :billCode ")
    DeliveryNoteResponse getOne(@Param("billCode") String billCode);

    @Query("""
        SELECT deliveryNote FROM DeliveryNote deliveryNote
            INNER JOIN Bill bill ON deliveryNote.bill.id = bill.id
        WHERE bill.status IN ('wait_for_confirm', 'wait_for_delivery')
        AND bill.id = ?1
    """)
    List<DeliveryNote> findAllDeliveryNoteByBillId(Long billId);
}
