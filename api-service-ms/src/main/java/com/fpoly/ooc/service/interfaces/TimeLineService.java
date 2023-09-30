package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.TimeLine;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;

import java.sql.Time;
import java.util.List;

public interface TimeLineService {

    List<TimeLineResponse> getAllTimeLineByBillId(Long id);

    TimeLine createTimeLine(Long billid, TimeLinerequest request);

}
