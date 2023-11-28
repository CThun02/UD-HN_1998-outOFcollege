package com.fpoly.ooc.controller.client;

import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.request.voucher.DisplayVoucherRequest;
import com.fpoly.ooc.service.interfaces.AddressDetailService;
import com.fpoly.ooc.service.interfaces.AddressServiceI;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Optional;

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

    @Autowired
    private TimeLineService timeLineService;

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private BillRepo billRepo;

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

    @PostMapping("/vouchers/display-modal-using")
    public ResponseEntity<?> displayModalUsingVoucher(@RequestBody DisplayVoucherRequest request) {
        return ResponseEntity.ok(voucherService.findAllVoucherResponseDisplayModalUsing(request));
    }

    @GetMapping("/getCartIndex")
    public ResponseEntity<?> getCartIndex(@RequestParam("username") String username) {
        return ResponseEntity.ok(cartDetailService.getCartIndexz(username));
    }

    @GetMapping("/filterProductDetailSellByIdCom")
    public ResponseEntity<?> filterProductDetailSellByIdCom(@RequestParam Optional<Long> productId,
                                                            @RequestParam Optional<Long> buttonId,
                                                            @RequestParam Optional<Long> materialId,
                                                            @RequestParam Optional<Long> shirtTailId,
                                                            @RequestParam Optional<Long> sleeveId,
                                                            @RequestParam Optional<Long> collarId,
                                                            @RequestParam Optional<Long> patternId,
                                                            @RequestParam Optional<Long> formId,
                                                            @RequestParam Optional<Long> brandId,
                                                            @RequestParam Optional<Long> categoryId,
                                                            @RequestParam Optional<Long> colorId,
                                                            @RequestParam Optional<Long> sizeId,
                                                            @RequestParam Optional<BigDecimal> minPrice,
                                                            @RequestParam Optional<BigDecimal> maxPrice) {
        ProductDetailRequest request = ProductDetailRequest.builder().productId(productId.orElse(null))
                .brandId(brandId.orElse(null)).buttonId(buttonId.orElse(null)).categoryId(categoryId.orElse(null))
                .collarId(collarId.orElse(null)).formId(formId.orElse(null)).patternId(patternId.orElse(null))
                .materialId(materialId.orElse(null)).shirtTailId(shirtTailId.orElse(null)).sleeveId(sleeveId.orElse(null))
                .colorId(colorId.orElse(null)).sizeId(sizeId.orElse(null)).build();
        return ResponseEntity.ok(billService.getProductDetailSellInStore
                (request, minPrice.orElse(null), maxPrice.orElse(null)));
    }


    @GetMapping("/timelineByUser")
    public ResponseEntity<?> timelineByUser(@RequestParam("username") String username,
                                            @RequestParam("billCode") String billCode,
                                            @RequestParam("status") String status,
                                            @RequestParam("symbol") String symbol,
                                            @RequestParam("count") Optional<Integer> count,
                                            @RequestParam("createdBy") String createdBy
    ) {
        return ResponseEntity.ok(timeLineService.getListTimelineByUser(
                username.trim().equals("") ? null : username,
                billCode.trim().equals("") ? null : billCode,
                status.trim().equals("") ? null : status,
                symbol.trim().equals("") ? null : symbol,
                count.orElse(null),
                createdBy.trim().equals("") ? null : createdBy
        ));
    }

    @GetMapping("/pdf/{billCode}")
    public ResponseEntity<?> pdfResponse(@PathVariable("billCode") String billCode) {
        return ResponseEntity.status(200).body(billDetailService.pdfResponse(billCode));
    }

    @GetMapping("/timeline/{billId}")
    public ResponseEntity<?> pdfResponse(@PathVariable("billId") Long billId) {
        return ResponseEntity.ok(timeLineService.getAllTimeLineByBillId(billId));
    }

    @PostMapping("/create-timeline/{id}")
    public ResponseEntity<?> createTimelineByBillId(
            @PathVariable("id") Long id,
            @RequestBody(required = false) TimeLinerequest request) {
        Bill bill;
        bill = billRepo.findById(id).orElse(null);
        if (bill != null) {
            bill.setCreatedBy(request.getCreatedBy());
            billRepo.saveAndFlush(bill);
        }

        return ResponseEntity.ok(timeLineService.createTimeLine(id, request));
    }

    @PutMapping("/change-status-bill/{id}")
    public ResponseEntity<?> updateBillStatus(@PathVariable("id") Long id,
                                              @RequestBody BillStatusDTO dto) {
        return ResponseEntity.ok(billService.updateBillStatus(dto, id));
    }
}
