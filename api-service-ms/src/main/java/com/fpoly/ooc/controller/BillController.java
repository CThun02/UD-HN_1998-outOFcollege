package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.bill.BillResponse;
import com.fpoly.ooc.responce.bill.BillReturnRequestResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductDisplayResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillService billService;

    @Autowired
    private BillDetailService billDetailService;

    @GetMapping("")
    public ResponseEntity<?> getAllBillManagement(
            @RequestParam(value = "billCode", required = false) String billCode,
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> endDate,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "symbol", required = false) String symbol,
            @RequestParam(value = "count", required = false) Optional<Integer> count,
            @RequestParam(value = "createdBy", required = false) String createdBy) {
        LocalDateTime startDateTime = startDate.map(date -> LocalDateTime.of(date, LocalTime.MIN)).orElse(null);
        LocalDateTime endDateTime = endDate.map(date -> LocalDateTime.of(date, LocalTime.MAX)).orElse(null);

        return ResponseEntity.ok(billService.getAllBillManagement(billCode.trim().equals("") ? null : billCode,
                startDateTime,
                endDateTime,
                status.trim().equals("") ? null : status,
                symbol.trim().equals("") ? null : symbol,
                count.orElse(null),
                createdBy.trim().equals("") ? null : createdBy));
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

    @PostMapping()
    public ResponseEntity<?> createBill(@RequestBody(required = false) BillRequest request) {
        return ResponseEntity.ok(billService.createBill(request));
    }

    @GetMapping("/customer")
    public ResponseEntity<?> getListCustomer() {
        return ResponseEntity.ok(billService.getListCustomer());
    }

    @GetMapping("/getDataLineChart")
    public ResponseEntity<?> getDataLineChart(@RequestParam Optional<Integer> dayFrom,
                                              @RequestParam Optional<Integer> monthFrom,
                                              @RequestParam Optional<Integer> yearFrom,
                                              @RequestParam Optional<Integer> dayTo,
                                              @RequestParam Optional<Integer> monthTo,
                                              @RequestParam Optional<Integer> yearTo) {

        return ResponseEntity.ok(billService.getDataLineChart(dayFrom.orElse(null), monthFrom.orElse(null),
                yearFrom.orElse(null), dayTo.orElse(null), monthTo.orElse(null), yearTo.orElse(null)));
    }

    @GetMapping("/getGrossRevenue")
    public ResponseEntity<?> getGrossRevenue(
            @RequestParam String day,
            @RequestParam String dayTo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        LocalDateTime dateFrom = LocalDateTime.parse(day, formatter);
        LocalDateTime dateTo = LocalDateTime.parse(dayTo, formatter).plusDays(1);
        System.out.println("CHECKDATE"+dateFrom +dateTo);
        return ResponseEntity.ok(billService.getBillRevenue(dateFrom,  dateTo));
    }

    @GetMapping("/getBillRevenueCompare")
    public ResponseEntity<?> getBillRevenueCompare(
            @RequestParam String day,
            @RequestParam String dayTo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        LocalDateTime dateFrom = LocalDateTime.parse(day, formatter);
        LocalDateTime dateTo = LocalDateTime.parse(dayTo, formatter);
        return ResponseEntity.ok(billService.getRevenueInStoreOnlineCompare(dateFrom,  dateTo.plusDays(1)));
    }

    @GetMapping("/getGrowthStoreByTime")
    public ResponseEntity<?> getGrowthStoreByTime(@RequestParam String time) {
        return ResponseEntity.ok(billService.getGrowthStoreByTime(time));
    }

    @GetMapping("/getBillProductSellTheMost")
    public ResponseEntity<?> getBillProductSellTheMost(
            @RequestParam String day,
            @RequestParam String dayTo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        LocalDateTime dateFrom = LocalDateTime.parse(day, formatter);
        LocalDateTime dateTo = LocalDateTime.parse(dayTo, formatter);
        return ResponseEntity.ok(billService.getProductInBillByStatusAndId(null, dateFrom, dateTo.plusDays(1)));
    }

    @GetMapping("/compareRevenueDate")
    public ResponseEntity<?> compareRevenueDate(@RequestParam Optional<Integer> dayFrom,
                                                @RequestParam Optional<Integer> monthFrom,
                                                @RequestParam Optional<Integer> yearFrom,
                                                @RequestParam Optional<Integer> dayTo,
                                                @RequestParam Optional<Integer> monthTo,
                                                @RequestParam Optional<Integer> yearTo) {
        return ResponseEntity.ok(billService.compareRevenueDate(dayFrom.orElse(null), monthFrom.orElse(null),
                yearFrom.orElse(null), dayTo.orElse(null), monthTo.orElse(null), yearTo.orElse(null)));
    }

    @GetMapping("/getBillByBillCode")
    public ResponseEntity<?> getBillByBillCode(@RequestParam String billCode) {
        return ResponseEntity.ok(billService.getBillByBillCode(billCode));
    }

    @GetMapping("/getBillReturnByBillCode")
    public ResponseEntity<?> getBillReturnByBillCode(@RequestParam String billCode) {
        return ResponseEntity.ok(billService.getBillReturnByBillCode(billCode));
    }

    @GetMapping("/getReturnRequestByStatus")
    public ResponseEntity<?> getReturnRequestByStatus(@RequestParam() String status) {
        return ResponseEntity.ok(billService.getReturnRequestByStatus(status));
    }

    @GetMapping("/customer/{username}/address")
    public ResponseEntity<?> getListAddressByUserName(@PathVariable("username") String username) {
        return ResponseEntity.ok(billService.getListAddressByUserName(username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable("id") Long id) {
        billService.deleteBill(id);
        return ResponseEntity.ok().body("Xóa thành công");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBillStatus(@RequestBody BillStatusDTO dto) {
        return ResponseEntity.ok(billService.updateBillStatus(dto));
    }

    @PutMapping("/billDetail/change-status")
    public ResponseEntity<?> changeStatus(@RequestBody List<Long> request, @RequestParam String status) {
        for (int i = 0; i < request.size(); i++) {
            billDetailService.updateBill(request.get(i), status);
        }
        return null;
    }

    @PostMapping("/create-bill-detail")
    public ResponseEntity<?> createdBillDetail(@RequestBody BillDetailRequest request) {
        return ResponseEntity.ok(billDetailService.createBillDetail(request));
    }

}
