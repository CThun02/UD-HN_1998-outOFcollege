package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.TimeLine;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeLineRepo extends JpaRepository<TimeLine, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.timeline.TimeLineResponse(t.id, t.bill.id, t.note, t.status, " +
            "   t.createdAt, t.createdBy, t.bill.billType, p.paymentName, b.status, b.completionDate, b.price, " +
            "   acc.fullName, acc.numberPhone, acc.email, add.descriptionDetail +  ' ' + add.ward + ' ' + add.district + ' ' + add.city )" +
            "FROM TimeLine t JOIN Bill b ON t.bill.id = b.id " +
            "   JOIN BillDetail bd ON bd.bill.id = b.id " +
            "   JOIN Account acc ON acc.username = b.account.username " +
            "   JOIN AddressDetail ad ON ad.accountAddress.username = acc.username " +
            "   JOIN Address add ON add.id = ad.addressDetail.id " +
            "   JOIN PaymentDetail pd ON pd.bill.id = b.id " +
            "   JOIN Payment p ON p.id = pd.payment.id " +
            "WHERE b.id = :billId " +
            "ORDER BY t.id")
    List<TimeLineResponse> getTimeLineByBillId(@Param("billId") Long id);

}
