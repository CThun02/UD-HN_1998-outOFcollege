package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/timeline")
@CrossOrigin("*")
@Slf4j
public class TimelineController {

    @Autowired
    private TimeLineService timeLineService;

    @Autowired
    private BillRepo billRepo;

    @GetMapping("/{id}/info")
    public ResponseEntity<?> getBillInfoByBillId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(timeLineService.getBillInfoByBillId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllTimeLineByBillId(@PathVariable("id") Long id) throws NotFoundException {
        return ResponseEntity.ok(timeLineService.getAllTimeLineByBillId(id));
    }

    @GetMapping("/{id}/product")
    public ResponseEntity<?> getTimelineProductByBillId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(timeLineService.getTimelineProductByBillId(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> createTimelineByBillId(
            @PathVariable("id") Long id,
            @RequestBody(required = false) TimeLinerequest request) throws JsonProcessingException, NotFoundException {
//        Bill bill = billRepo.findById(id).orElse(null);
////
////        if (bill != null) {
////            bill.setCreatedBy(request.getCreatedBy());
////            billRepo.save(bill);
////        }

        return ResponseEntity.ok(timeLineService.createTimeLine(id, request));
    }

}
