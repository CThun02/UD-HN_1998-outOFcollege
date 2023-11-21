package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.service.interfaces.TimeLineService;
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
public class TimelineController {

    @Autowired
    private TimeLineService timeLineService;

    @GetMapping("/{id}/info")
    public ResponseEntity<?> getBillInfoByBillId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(timeLineService.getBillInfoByBillId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllTimeLineByBillId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(timeLineService.getAllTimeLineByBillId(id));
    }

    @GetMapping("/{id}/product")
    public ResponseEntity<?> getTimelineProductByBillId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(timeLineService.getTimelineProductByBillId(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> createTimelineByBillId(
            @PathVariable("id") Long id,
            @RequestBody(required = false) TimeLinerequest request) {
        return ResponseEntity.ok(timeLineService.createTimeLine(id, request));
    }

}
