package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.TimeLineRepo;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Timeline createTimeLine(Long billId, TimeLinerequest request) {
        Bill bill = billRepo.findById(billId).orElse(null);
        if (bill == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        Timeline timeLine = new Timeline();
        timeLine.setBill(bill);
        timeLine.setNote(request.getNote());
        if (request.getStatus() == null) {
            List<TimeLineResponse> lst = timeLineRepo.getTimeLineByBillId(billId);
            Integer statusIncrease = 0;
            if (lst.isEmpty()) {
                statusIncrease++;
            } else {
                statusIncrease = Integer.valueOf(lst.get(lst.size() - 1).getStatus());
                statusIncrease++;
            }

            timeLine.setStatus(String.valueOf(statusIncrease));
        } else {
            timeLine.setStatus(request.getStatus());
        }

        return timeLineRepo.save(timeLine);
    }

    @Override
    public List<TimelineProductResponse> getTimelineProductByBillId(Long id) {
        return timeLineRepo.getTimelineProductByBillId(id);
    }

    @Override
    public BillInfoResponse getBillInfoByBillId(Long id) {
        return timeLineRepo.getBillInfoByIdBillId(id);
    }


}
