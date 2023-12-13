package com.fpoly.ooc.controller;

import com.fpoly.ooc.service.interfaces.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notification")
@AllArgsConstructor
public class NotificationController {
    private NotificationService notificationService;

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(notificationService.notificationDTOList());
    }
}
