package com.fpoly.ooc.controller.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.dto.EmailDetails;
import com.fpoly.ooc.dto.ListQuantityAndPriceRequest;
import com.fpoly.ooc.dto.QuantityAndPriceDTO;
import com.fpoly.ooc.dto.UpdateQuantityProductDetailDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.request.DeliveryNoteRequest;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.timeline.TimeLinerequest;
import com.fpoly.ooc.request.voucher.DisplayVoucherRequest;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.AddressDetailService;
import com.fpoly.ooc.service.interfaces.AddressServiceI;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.service.interfaces.EmailService;
import com.fpoly.ooc.service.interfaces.PaymentService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
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

    @Autowired
    private EmailService emailService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ProductDetailServiceI productDetailService;

    @GetMapping("/address")
    public ResponseEntity<?> getAll(@RequestParam("username") String username) {
        return ResponseEntity.ok(addressService.getListAddress(username));
    }

    @PostMapping("/bill")
    public ResponseEntity<?> createBill(@RequestBody(required = false) BillRequest request) throws JsonProcessingException, NotFoundException {
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
    public ResponseEntity<?> createAddress(@RequestBody Address address, @RequestParam String userName) throws NotFoundException {
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

    @GetMapping("/deleteCart/{user}/{cartDetailId}")
    public ResponseEntity<?> deleteCartFromUser(@PathVariable("user") String user, @PathVariable("cartDetailId") Long cartDetailId) throws NotFoundException {
        return ResponseEntity.ok(cartDetailService.deleteProductInCartFromUser(user, cartDetailId));
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
    public ResponseEntity<?> pdfResponse(@PathVariable("billCode") String billCode) throws NotFoundException {
        return ResponseEntity.ok(billDetailService.pdfResponse(billCode));
    }

    @GetMapping("/timeline/{billId}")
    public ResponseEntity<?> timelineResponse(@PathVariable("billId") Long billId) throws NotFoundException {
        return ResponseEntity.ok(timeLineService.getAllTimeLineByBillId(billId));
    }

    @PostMapping("/create-timeline/{id}")
    public ResponseEntity<?> createTimelineByBillId(
            @PathVariable("id") Long id,
            @RequestBody(required = false) TimeLinerequest request) throws JsonProcessingException, NotFoundException {
        Bill bill;
        bill = billRepo.findById(id).orElse(null);
        if (bill != null) {
            bill.setCreatedBy(request.getCreatedBy());
            billRepo.saveAndFlush(bill);
        }

        return ResponseEntity.ok(timeLineService.createTimeLine(id, request));
    }


    @PutMapping("/change-status-bill")
    public ResponseEntity<?> updateBillStatus(@RequestBody BillStatusDTO dto) throws JsonProcessingException, NotFoundException {
        return ResponseEntity.ok(billService.updateBillStatus(dto));
    }

    @PostMapping("/email")
    public ResponseEntity<?> email(@RequestBody EmailDetails emailDetails) {
        return ResponseEntity.ok(emailService.sendSimpleMail(emailDetails));
    }

    @PutMapping("/update-address/{id}")
    public ResponseEntity<?> updateAddress(@RequestBody Address address,
                                           @PathVariable("id") Long id) {
        address.setId(id);
        return ResponseEntity.ok(addressService.update(address));
    }

    @PutMapping("/update-delivery-note/{billId}")
    public ResponseEntity<?> updateAddress(@RequestBody DeliveryNoteRequest request,
                                           @PathVariable("billId") Long billId) {
        return ResponseEntity.ok(deliveryNoteService.updateShippingPrice(billId,
                request.getShipPrice(), request.getShipDate()));
    }

    @GetMapping("/delivery-note/{billCode}")
    public ResponseEntity<?> getOneDeliveryNote(@PathVariable("billCode") String billCode) {
        return ResponseEntity.ok(deliveryNoteService.getOne(billCode));
    }

    @GetMapping("/countBill")
    public ResponseEntity<?> countBill(
            @RequestParam(value = "billType", required = false) String billType,
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> endDate) {
        LocalDateTime startDateTime = startDate.map(date -> LocalDateTime.of(date, LocalTime.MIN)).orElse(null);
        LocalDateTime endDateTime = endDate.map(date -> LocalDateTime.of(date, LocalTime.MAX)).orElse(null);
        return ResponseEntity.ok(billService.getCountFilterBill(billType.trim().equals("") ? null : billType,
                startDateTime, endDateTime));
    }

    @GetMapping("/address/{id}")
    public ResponseEntity<?> findByAddress(@PathVariable("id") Long id) throws NotFoundException {
        return ResponseEntity.ok(addressService.getOne(id));
    }

    @GetMapping("/account/{username}")
    public ResponseEntity<?> detail(@PathVariable String username) {
        return ResponseEntity.ok(accountService.detail(username));
    }

    @GetMapping("/getTimelineClientByBillCode/{billCode}")
    public ResponseEntity<?> getTest(@PathVariable("billCode") String billCode) throws NotFoundException {
        return ResponseEntity.ok().body(timeLineService.getTimelineByBillCode(billCode));
    }

    @PostMapping("/autoFillVoucher")
    public ResponseEntity<?> autoFillVoucher(@RequestBody DisplayVoucherRequest req) {
        return ResponseEntity.ok(voucherService.autoFillVoucher(req));
    }

    @GetMapping("/vouchers/{username}")
    public ResponseEntity<?> getVoucherByUsernameAndVoucherCode(@PathVariable("username") String username,
                                                                @RequestParam(value = "voucherCode", required = false) String voucherCode) {
        return ResponseEntity.ok(voucherService.getVoucherByUsernameAndVoucherCode(username,
                voucherCode.trim().equals("") ? null : voucherCode));
    }

    @PostMapping("/isCheckQuantity")
    public ResponseEntity<?> isCheckQuantity(@RequestBody ListQuantityAndPriceRequest dto) throws NotFoundException {
        return ResponseEntity.ok(productDetailService.isCheckQuantity(dto));
    }

    @GetMapping("/getColorProductDetailEdit")
    public ResponseEntity<?> getColorProductDetailEdit(@RequestParam("id") Long productDetailId,
                                                       @RequestParam("sizeId") Optional<Long> sizeId) {
        return ResponseEntity.ok(productDetailService.getColorProductDetailEdit(productDetailId, sizeId.orElse(null)));
    }

    @GetMapping("/getSizeProductDetailEdit")
    public ResponseEntity<?> getSizeProductDetailEdit(@RequestParam("id") Long productDetailId,
                                                      @RequestParam("colorId") Optional<Long> colorId){
        return ResponseEntity.ok(productDetailService.getSizeProductDetailEdit(productDetailId, colorId.orElse(null)));
    }

    @GetMapping("/getProductDetailEdit")
    public ResponseEntity<?> getProductDetailEdit(@RequestParam("id") Long productDetailId,
                                                  @RequestParam("colorId") Long colorId,
                                                  @RequestParam("sizeId") Long sizeId){
        return ResponseEntity.ok(billService.getProductDetailSellInStoreByPdIdAndColorAndSize(productDetailId, colorId, sizeId));
    }

    @PostMapping("/addToBill/{billCode}")
    public ResponseEntity<?> addToBill(@PathVariable("billCode") String billCode, @RequestBody ProductDetailRequest request) throws NotFoundException, JsonProcessingException {
        billDetailService.createBillDetail(request, billCode);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/updateBill/{billDetailId}")
    public ResponseEntity<?> updateBill(@PathVariable("billDetailId")  Long billDetailId, @RequestBody ProductDetailRequest request) throws NotFoundException, JsonProcessingException {
        billDetailService.updateBillDetail(request, billDetailId);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/deleteBD")
    public ResponseEntity<?> deleteBD(@RequestParam("bdId") Long bdId, @RequestParam("bId") Long bId) throws NotFoundException, JsonProcessingException {
        billDetailService.deleteBillDetail(bId, bdId);
        return ResponseEntity.ok("ok");
    }
}
