package com.fpoly.ooc.service.interfaces;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineClientResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductDisplayResponse;

import java.util.List;

public interface TimeLineService {

    List<TimeLineResponse> getAllTimeLineByBillId(Long id) throws NotFoundException;

   TimelineClientResponse getTimelineByBillCode(String billCode) throws NotFoundException;

    Timeline createTimeLine(Long billid, TimeLinerequest request) throws JsonProcessingException, NotFoundException;

    List<TimelineProductDisplayResponse> getTimelineProductByBillId(Long id) throws NotFoundException;

    BillInfoResponse getBillInfoByBillId(Long id);

    List<TimelineProductDisplayResponse>
    getListTimelineByUser(String username,
                          String billCode,
                          String status,
                          String symbol,
                          Integer count,
                          String createdBy);
    Timeline timelineFromBillId(Long billId);
}
