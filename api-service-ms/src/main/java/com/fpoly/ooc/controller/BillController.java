package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("")
    public ResponseEntity<?> getAllBillManagement(
            @RequestParam(value = "billCode", required = false) String billCode,
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> endDate,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "billType", required = false) String billType,
            @RequestParam(value = "symbol", required = false) String symbol) {
        LocalDateTime startDateTime = startDate.map(date -> LocalDateTime.of(date, LocalTime.MIN)).orElse(null);
        LocalDateTime endDateTime = endDate.map(date -> LocalDateTime.of(date, LocalTime.MAX)).orElse(null);

        return ResponseEntity.ok(billService.getAllBillManagement(billCode, startDateTime, endDateTime,
                status, billType, symbol));
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
    public ResponseEntity<?> getDataLineChart(@RequestParam() String years) {
        if(years.equals("")){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(billService.getDataLineChart(years));
    }

    @GetMapping("/getGrossRevenue")
    public ResponseEntity<?> getGrossRevenue(@RequestParam(defaultValue = "5") Integer quantityDisplay, @RequestParam() String date){
        return ResponseEntity.ok(billService.getBillRevenue(quantityDisplay, date));
    }

    @GetMapping("/getBillRevenueCompare")
    public ResponseEntity<?> getBillRevenueCompare(){
        return ResponseEntity.ok(billService.getRevenueInStoreOnlineCompare());
    }

    @GetMapping("/getBillProductSellTheMost")
    public ResponseEntity<?> getBillProductSellTheMost(@RequestParam(defaultValue = "0")int quantitySell){
        return ResponseEntity.ok(billService.getProductInBillByStatusAndId(quantitySell, null, "Paid"));
    }

    @GetMapping("/getBusinessYear")
    public ResponseEntity<?> getBusinessYear(){
        return ResponseEntity.ok(billService.getBusinessYear());
    }

    @GetMapping("/compareRevenueDate")
    public ResponseEntity<?> compareRevenueDate(@RequestParam Optional<Integer> dayFrom,
                                                @RequestParam Optional<Integer> monthFrom,
                                                @RequestParam Optional<Integer> yearFrom,
                                                @RequestParam Optional<Integer> dayTo,
                                                @RequestParam Optional<Integer> monthTo,
                                                @RequestParam Optional<Integer> yearTo){
        System.out.println("CHeck" +dayFrom.orElse(null));
        return ResponseEntity.ok(billService.compareRevenueDate(dayFrom.orElse(null), monthFrom.orElse(null),
                yearFrom.orElse(null), dayTo.orElse(null), monthTo.orElse(null), yearTo.orElse(null)));
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
    public ResponseEntity<?> updateBillStatus(@PathVariable("id") Long id,
                                              @RequestBody BillStatusDTO dto) {
        return ResponseEntity.ok(billService.updateBillStatus(dto, id));
    }

}
