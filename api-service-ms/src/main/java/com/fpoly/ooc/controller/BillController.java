package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private BillService billService;

    @Autowired
    private TimeLineService timeLineService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(billDetailService.getAll());
    }

    @GetMapping("/{id}/timeline")
    public ResponseEntity<?> getAllTimeLineByBillId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(timeLineService.getAllTimeLineByBillId(id));
    }

    @GetMapping("/{id}/product")
    public ResponseEntity<?> getTimelineProductByBillId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(timeLineService.getTimelineProductByBillId(id));
    }

    @PostMapping()
    public ResponseEntity<?> createBill(@RequestBody(required = false) BillRequest request) {
        return ResponseEntity.ok(billService.createBill(request));
    }

    @PostMapping("/{id}/timelines")
    public ResponseEntity<?> createTimelineByBillId(
            @PathVariable("id") Long id,
            @RequestBody(required = false) TimeLinerequest request) {
        return ResponseEntity.ok(timeLineService.createTimeLine(id, request));
    }

    @PutMapping()
    public ResponseEntity<?> updateBill() {
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable("id") Long id) {
        billService.deleteBill(id);
        return ResponseEntity.ok().body("Xóa thành công");
    }

}
