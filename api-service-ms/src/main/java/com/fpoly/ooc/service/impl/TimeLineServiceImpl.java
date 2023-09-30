package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.TimeLine;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.TimeLineRepo;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeLineServiceImpl implements TimeLineService {

    @Autowired
    private TimeLineRepo timeLineRepo;

    @Autowired
    private BillRepo billRepo;

    @Override
    public List<TimeLineResponse> getAllTimeLineByBillId(Long id) {
        Bill bill = billRepo.findById(id).orElse(null);
        if (bill == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        return timeLineRepo.getTimeLineByBillId(id);
    }

    @Override
    public TimeLine createTimeLine(TimeLinerequest request) {
        TimeLine timeLine = new TimeLine();
        timeLine.setBill(Bill.builder().id(request.getBillId()).build());
        timeLine.setNote(request.getNote());
        timeLine.setStatus(request.getStatus());

        return timeLine;
    }
}
