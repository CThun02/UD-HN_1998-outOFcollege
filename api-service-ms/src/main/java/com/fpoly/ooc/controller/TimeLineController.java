package com.fpoly.ooc.controller;

import com.fpoly.ooc.service.interfaces.TimeLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/timeline")
@CrossOrigin("*")
public class TimeLineController {

    @Autowired
    private TimeLineService timeLineService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllTimeLineByBillId(@PathVariable("id") Long id){
        return ResponseEntity.ok(timeLineService.getAllTimeLineByBillId(id));
    }

}
