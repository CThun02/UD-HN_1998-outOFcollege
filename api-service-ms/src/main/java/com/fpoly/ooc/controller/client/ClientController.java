package com.fpoly.ooc.controller.client;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.voucher.DisplayVoucherRequest;
import com.fpoly.ooc.service.interfaces.AddressDetailService;
import com.fpoly.ooc.service.interfaces.AddressServiceI;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private AddressServiceI addressService;

    @Autowired
    private BillService billService;

    @Autowired
    private DeliveryNoteService deliveryNoteService;

    @Autowired
    private AddressDetailService addressDetailService;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private CartDetailService cartDetailService;

    @GetMapping("/address")
    public ResponseEntity<?> getAll(@RequestParam("username") String username) {
        return ResponseEntity.ok(addressService.getListAddress(username));
    }

    @PostMapping("/bill")
    public ResponseEntity<?> createBill(@RequestBody(required = false) BillRequest request) {
        return ResponseEntity.ok(billService.createBill(request));
    }

    @PostMapping("/address")
    public ResponseEntity<?> createAddress(@RequestBody Address address) {
        return ResponseEntity.ok(addressService.create(address));
    }

    @PostMapping("/delivery-note")
    public ResponseEntity<?> createDeliveryNote(@RequestBody DeliveryNoteRequest request) {
        return ResponseEntity.ok(deliveryNoteService.createDeliveryNote(request));
    }

    @PutMapping("/createAddress")
    public ResponseEntity<?> createAddress(@RequestBody Address address, @RequestParam String userName) {
        Address addressCreate = addressService.create(address);
        AddressDetail addressDetailCreate = AddressDetail.builder().accountAddress(Account.builder().username(userName).build())
                .addressDetail(Address.builder().id(addressCreate.getId()).build()).build();
        return ResponseEntity.ok(addressDetailService.create(addressDetailCreate));
    }

    @PostMapping("/display-modal-using")
    public ResponseEntity<?> displayModalUsingVoucher(@RequestBody DisplayVoucherRequest request) {
        return ResponseEntity.ok(voucherService.findAllVoucherResponseDisplayModalUsing(request));
    }

    @GetMapping("/getCartIndex")
    public ResponseEntity<?> getCartIndex(@RequestParam("username") String username) {
        return ResponseEntity.ok(cartDetailService.getCartIndexz(username));
    }

}
