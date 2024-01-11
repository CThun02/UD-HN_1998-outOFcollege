package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.UpdateShippingPriceDeliveryDTO;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/delivery-note")
public class DeliveryNoteController {

    @Autowired
    private DeliveryNoteService deliveryNoteService;

    @PostMapping()
    public ResponseEntity<?> createDeliveryNote(@RequestBody DeliveryNoteRequest request){
        return ResponseEntity.ok(deliveryNoteService.createDeliveryNote(request));
    }

    @PutMapping("/updateShippingPrice")
    public ResponseEntity<?> updateShippingPrice(@RequestBody UpdateShippingPriceDeliveryDTO dto) throws NotFoundException {
        boolean isUpdate = deliveryNoteService.updateShippingPrice(dto);
        return ResponseEntity.ok(isUpdate);
    }

}
