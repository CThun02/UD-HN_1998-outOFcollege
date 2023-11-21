package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductDisplayResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;

import java.util.List;

public interface TimeLineService {

    List<TimeLineResponse> getAllTimeLineByBillId(Long id);

    Timeline createTimeLine(Long billid, TimeLinerequest request);

    List<TimelineProductDisplayResponse> getTimelineProductByBillId(Long id);

    BillInfoResponse getBillInfoByBillId(Long id);

    List<ProductDetailDisplayResponse>
    getListTimelineByUser(String username, String phoneNumber, String email, String status);

}
