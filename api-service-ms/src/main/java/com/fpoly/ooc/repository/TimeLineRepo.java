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
            "   t.createdAt, t.createdBy)" +
            "FROM TimeLine t " +
            "WHERE t.bill.id = :billId " +
            "ORDER BY t.id")
    List<TimeLineResponse> getTimeLineByBillId(@Param("billId") Long id);

}
