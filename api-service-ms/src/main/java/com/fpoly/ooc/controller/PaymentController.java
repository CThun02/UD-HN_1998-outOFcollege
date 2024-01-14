package com.fpoly.ooc.controller;

import com.fpoly.ooc.config.PaymentConfig;
import com.fpoly.ooc.dto.EmailDetails;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.DeliveryNote;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.TimeLineRepo;
import com.fpoly.ooc.responce.timeline.TimelineClientResponse;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.service.interfaces.EmailService;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import com.fpoly.ooc.util.CommonUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.collections4.CollectionUtils;
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
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.TimeZone;


@RestController
@RequestMapping("/api/client")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private TimeLineRepo timeLineRepo;

    @Autowired
    private TimeLineService timeLineService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private DeliveryNoteService deliveryNoteService;

    @GetMapping("/pay")
    public String payment(@RequestParam("price") Long price,
                          @RequestParam("billId") String billId,
                          @RequestParam("email") String email
    )
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
        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.vnp_ReturnUrl + "?billId=" + billId + "&email=" + email);
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
    ) throws IOException, NotFoundException {
        String responseCode = queryParams.get("vnp_ResponseCode");
        String bankCode = queryParams.get("vnp_BankCode");
        String amount = queryParams.get("vnp_Amount");
        String transactionNo = queryParams.get("vnp_TransactionNo");
        Long billId = Long.valueOf(queryParams.get("billId"));
        String email = queryParams.get("email");
        if ("00".equals(responseCode)) {
            Bill bill = billRepo.findById(billId).orElseThrow(() -> new NotFoundException("Bill id không tồn tại"));
            DeliveryNote deliveryNote = deliveryNoteService.getDeliveryNoteByBill_Id(billId);
            TimelineClientResponse timelineResponse = timeLineService.getTimelineByBillCode(bill.getBillCode());
            bill.setTransactionCode(transactionNo);
            bill.setAmountPaid(new BigDecimal(amount).divide(BigDecimal.valueOf(100L)));
            bill.setStatus("wait_for_confirm");
            billRepo.save(bill);
            StringBuilder stringBuilder = new StringBuilder();
            BigDecimal totalPrice = BigDecimal.ZERO;
            double totalPriceProduct = 0d;
            DecimalFormat formatter = new DecimalFormat("###,###,###");
            for (int i = 0; i < timelineResponse.getLstProduct().size(); i++) {
                String path = null;
                if (CollectionUtils.isNotEmpty(timelineResponse.getLstProduct().get(i).getProductImageResponses())) {
                    if (Objects.nonNull(timelineResponse.getLstProduct().get(i).getProductImageResponses().get(0))) {
                        path = timelineResponse.getLstProduct().get(i).getProductImageResponses().get(0).getPath();
                    }
                }
                totalPriceProduct = CommonUtils.bigDecimalConvertDouble(timelineResponse.getLstProduct().get(i).getProductPrice().multiply(new BigDecimal(timelineResponse.getLstProduct().get(i).getQuantity())));
                BigDecimal productPrice = timelineResponse.getLstProduct().get(i).getProductPrice();
                totalPrice = totalPrice.add(productPrice);
                stringBuilder.append("<div key=\"{index}\" style=\"display: flex; justify-content: space-between; align-items: center; padding: 4px 20px\">\n" +
                        "              <div style=\"width: 20%; padding: 4px\">");
                stringBuilder.append("                <img\n");
                stringBuilder.append("                  alt=\"product\"\n");
                stringBuilder.append("                  style=\"width: 100%; border: 1px solid #ccc; border-radius: 8px\"\n");
                stringBuilder.append("                  src=").append(Objects.nonNull(path) ? path : null);
                stringBuilder.append("                  }\n");
                stringBuilder.append("                />\n");
                stringBuilder.append("              </div>\n");
                stringBuilder.append("              <div style=\"width: 55%; padding: 4px\">\n");
                stringBuilder.append("                <p>\n");
                stringBuilder.append(timelineResponse.getLstProduct().get(i).getProductName())
                        .append(timelineResponse.getLstProduct().get(i).getProductBrandName())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductCateGoryName())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductPatternName())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductFormName())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductButton())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductMaterial())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductCollar())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductSleeve())
                        .append("-")
                        .append(timelineResponse.getLstProduct().get(i).getProductShirtTail());
                stringBuilder.append("<span style=\"display: inline-block\">")
                        .append(timelineResponse.getLstProduct().get(i).getQuantity())
                        .append("</span>\n");
                stringBuilder.append("                </p>\n");

                stringBuilder.append("              </div>\n");
                stringBuilder.append("              <div style=\"width: 25%; padding: 4px\">\n");
                stringBuilder.append("                <p>")
                        .append(formatter.format(timelineResponse.getLstProduct().get(i).getProductPrice().multiply(new BigDecimal(timelineResponse.getLstProduct().get(i).getQuantity())))+"đ");
                stringBuilder.append("              </div>\n");
                stringBuilder.append("</div>\n" +
                        "            </div>");
            }
            String messagesBody = "<body style=\"margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif\">\n" +
                    "  <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"width: 100%; max-width: 720px; margin: 0 auto\">\n" +
                    "    <tr>\n" +
                    "      <td align=\"center\" bgcolor=\"#ffffff\" style=\"padding: 40px 0\">\n" +
                    "        <table style=\"width: 100%; padding: 0 20px\">\n" +
                    "          <tr>\n" +
                    "            <td style=\"text-align: left; width: 50%\">\n" +
                    "              <img\n" +
                    "                alt=\"Logo\"\n" +
                    "                src=\"https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/logo%2Flogo_OOC.png?alt=media&token=9dec0335-3b77-4c5b-a278-b5b22b9ecbb4\"\n" +
                    "                width=\"70%\"\n" +
                    "              />\n" +
                    "            </td>\n" +
                    "            <td style=\"text-align: right; vertical-align: middle; width: 50%\">\n" +
                    "              <span>Đơn hàng "+bill.getBillCode()+"</span>\n" +
                    "            </td>\n" +
                    "          </tr>\n" +
                    "        </table>\n" +
                    "        <div style=\"padding: 0 20px; margin-top: 24px\">\n" +
                    "          <span style=\"font-weight: 500; font-size: 24px\">Cảm ơn bạn đã mua hàng!</span><br /><br />\n" +
                    "          <p style=\"text-align: justify\">\n" +
                    "            Xin chào "+ timelineResponse.getTimelineCustomInfo().getFullName() +", Chúng tôi đã nhận được đặt hàng của bạn và đã sẵn sàng để vận chuyển. Chúng tôi sẽ thông báo cho bạn khi\n" +
                    "            đơn hàng được gửi đi.\n" +
                    "          </p>\n" +
                    "          <br />\n" +
                    "           <div style=\"text-align: center\">\n" +
                    "            <a\n" +
                    "              style=\"color: white; font-weight: 500; padding: 16px 20px; border-radius: 4px; background-color: #1666a2; margin-right: 20px\"\n" +
                    "              href=\"http://localhost:3000/ms-shop/bill/"+bill.getBillCode()+"\"\n"+
            "            >\n" +
                    "              Xem đơn hàng\n" +
                    "            </a>\n" +
                    "            hoặc <a style=\"margin-left: 20px\" href=\"http://localhost:3000/\">Đến cửa hàng</a>\n" +
                    "          </div>"+
                    "          <br />\n" +
                    "          <hr />\n" +
                    "          <br />\n" +
                    "          <span>Thông tin đơn hàng</span>\n" +
                    "          <div style=\"margin-top: 8px\">\n" +
                    stringBuilder.toString() +
                    " <br />\n" +
                    "            <hr />\n" +
                    "            <div style=\"width: 70%; float: right; padding: 4px 20px\">\n" +
                    "              <div style=\"text-align: center\">\n" +
                    "                <span style=\"font-size: 24px\">Phiếu giảm giá:</span>\n" +
                    "                <span style=\"font-size: 24px\"> " + formatter.format(new BigDecimal(totalPriceProduct + CommonUtils.bigDecimalConvertDouble(deliveryNote.getShipPrice()) -  CommonUtils.bigDecimalConvertDouble(new BigDecimal(amount).divide(BigDecimal.valueOf(100L)))))+"đ </span>\n" +
                    "              </div>\n" +
                    "               <div style=\"text-align: center\">\n " +
                    "                   <span style=\"font-size: 24px\">Phí vận chuyển:</span>\n" +
                    "                   <span style=\"font-size: 24px\"> " + formatter.format(deliveryNote.getShipPrice())+"đ </span>\n" +
                    "              </div>\n" +
                    "              <div style=\"text-align: center\">\n" +
                    "                <span style=\"font-size: 24px\">Tổng giá trị sản phẩm:</span>\n" +
                    "                <span style=\"font-size: 24px\"> " + formatter.format(new BigDecimal(amount).divide(BigDecimal.valueOf(100L)))+"đ </span>\n" +
                    "              </div>\n" +
                    "            </div>" +
                    "          </div>\n" +
                    "        </div>\n" +
                    "      </td>\n" +
                    "    </tr>\n" +
                    "  </table>\n" +
                    "</body>\n";

            EmailDetails emailDetails = new EmailDetails();
            List<String> mails = new ArrayList<>();
            mails.add(email);
            emailDetails.setRecipient(mails);
            emailDetails.setMessageBody(messagesBody);
            emailDetails.setSubject("THÔNG BÁO XÁC NHẬN ĐƠN HÀNG " + bill.getBillCode());
            emailService.sendSimpleMail(emailDetails);
            response.sendRedirect("http://localhost:3000/ms-shop/");
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
