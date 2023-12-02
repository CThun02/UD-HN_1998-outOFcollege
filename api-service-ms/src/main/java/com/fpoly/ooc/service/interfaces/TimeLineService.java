package com.fpoly.ooc.service.interfaces;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductDisplayResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;

import java.util.List;

public interface TimeLineService {

    List<TimeLineResponse> getAllTimeLineByBillId(Long id);

    Timeline createTimeLine(Long billid, TimeLinerequest request) throws JsonProcessingException;

    List<TimelineProductDisplayResponse> getTimelineProductByBillId(Long id);

    BillInfoResponse getBillInfoByBillId(Long id);

    List<TimelineProductDisplayResponse>
    getListTimelineByUser(String username,
                          String billCode,
                          String status,
                          String symbol,
                          Integer count,
                          String createdBy);

}
