package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.TimeLine;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;

import java.util.List;

public interface TimeLineService {

    List<TimeLineResponse> getAllTimeLineByBillId(Long id);

    TimeLine createTimeLine(Long billid, TimeLinerequest request);

    List<TimelineProductResponse> getTimelineProductByBillId(Long id);

    BillInfoResponse getBillInfoByBillId(Long id);

}
