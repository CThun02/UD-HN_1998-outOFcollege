package com.fpoly.ooc.controller;

import com.fpoly.ooc.config.PaymentConfig;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.TimeLineRepo;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;


@RestController
@RequestMapping("/api/client")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private TimeLineRepo timeLineRepo;

    @GetMapping("/pay")
    public String payment(@RequestParam("price") Long price,
                          @RequestParam("billId") String billId)
            throws UnsupportedEncodingException {

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = price * 100;
        String bankCode = "NCB";

        String vnp_IpAddr = "127.0.0.1";
        String vnp_TxnRef = PaymentConfig.getRandomNumber(8);
        String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.vnp_ReturnUrl + "?billId=" + billId);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;

        return paymentUrl;
    }

    @GetMapping("/callback")
    public void paymentInfo(
            @RequestParam Map<String, String> queryParams,
            HttpServletResponse response
    ) throws IOException {
        String responseCode = queryParams.get("vnp_ResponseCode");
        String bankCode = queryParams.get("vnp_BankCode");
        String amount = queryParams.get("vnp_Amount");
        String transactionNo = queryParams.get("vnp_TransactionNo");
        Long billId = Long.valueOf(queryParams.get("billId"));
        if ("00".equals(responseCode)) {
            Bill bill = billRepo.findById(billId).orElseThrow(() -> new NotFoundException("Bill id không tồn tại"));
            bill.setTransactionCode(transactionNo);
            bill.setAmountPaid(new BigDecimal(amount));
            bill.setStatus("Paid");
            billRepo.save(bill);
            response.sendRedirect("http://localhost:3000/ms-shop");
        } else {
            Bill bill = billRepo.findById(billId).orElseThrow(() -> new NotFoundException("Bill id không tồn tại"));
            bill.setTransactionCode(transactionNo);
            bill.setAmountPaid(new BigDecimal(amount));
            bill.setStatus("Cancel");
            billRepo.save(bill);
            Timeline timeline = new Timeline();
            timeline.setBill(bill);
            timeline.setStatus("0");
            timeLineRepo.save(timeline);
            response.sendRedirect("http://localhost:3000/ms-shop");
        }
    }
}