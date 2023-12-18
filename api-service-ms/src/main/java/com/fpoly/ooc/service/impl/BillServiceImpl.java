package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.dto.NotificationDTO;
import com.fpoly.ooc.dto.VoucherAccountConditionDTO;
import com.fpoly.ooc.dto.VoucherAccountUsedDTO;
import com.fpoly.ooc.entity.*;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.PaymentDetailRepo;
import com.fpoly.ooc.repository.TimeLineRepo;
import com.fpoly.ooc.repository.VoucherHistoryRepository;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.bill.*;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductDetailSellResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductDisplayResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.DeliveryNoteService;
import com.fpoly.ooc.service.interfaces.EmailService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import com.fpoly.ooc.service.interfaces.VoucherAccountService;
import com.fpoly.ooc.service.interfaces.VoucherHistoryService;
import com.fpoly.ooc.service.interfaces.VoucherService;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private PaymentDetailRepo paymentDetailRepo;

    @Autowired
    private TimeLineRepo timeLineRepo;

    @Autowired
    private VoucherHistoryService voucherHistoryService;

    @Autowired
    private ProductImageServiceI productImageService;

    @Autowired
    private PromotionServiceImpl promotionService;

    @Autowired
    private ProductDetailServiceI productDetailService;

    @Autowired
    private DeliveryNoteService deliveryNoteService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VoucherService voucherService;

    @Autowired
    private VoucherAccountService voucherAccountService;

    @Autowired
    private KafkaUtil kafkaUtil;

    @Transactional
    @Override
    public Bill createBill(BillRequest request) throws JsonProcessingException {
        Account accountBuilder = null;

        if (request.getAccountId() != null) {
            accountBuilder = Account.builder().username(request.getAccountId()).build();
        }

        Bill bill = Bill.builder()
                .account(accountBuilder)
                .priceReduce(request.getPriceReduce())
                .price(request.getPrice())
                .amountPaid(request.getAmountPaid())
                .billType(request.getBillType())
                .transactionCode(request.getTransactionCode())
                .symbol(request.getSymbol())
                .note(request.getNote())
                .billCode(request.getBillCode())
                .build();

        if (bill.getSymbol().equals("Received")) {
            bill.setCompletionDate(LocalDateTime.now());
        }
        bill.setStatus(request.getStatus());
        billRepo.save(bill);

        if (!request.getEmailDetails().getRecipient().isEmpty() && request.getPaymentDetailId() != 2) {
            emailService.sendSimpleMail(request.getEmailDetails());
        }

        for (BillDetailRequest billDetailRequest : request.getLstBillDetailRequest()) {
            BillDetail billDetail = BillDetail.builder()
                    .bill(bill)
                    .productDetail(ProductDetail.builder().id(billDetailRequest.getProductDetailId()).build())
                    .price(billDetailRequest.getPrice())
                    .quantity(billDetailRequest.getQuantity())
                    .status(Const.STATUS_INACTIVE)
                    .build();
            BillDetail billDetail1 = billDetailRepo.save(billDetail);

            if (billDetail1 != null) {
                ProductDetail productDetail = productDetailService.getOne(billDetail.getProductDetail().getId());
                productDetail.setQuantity(productDetail.getQuantity() - billDetail.getQuantity());
                try {
                    productDetailService.update(productDetail);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        if (request.getPaymentDetailId() == 3) {
            PaymentDetail paymentDetailLan1Nd = PaymentDetail.builder()
                    .bill(bill)
                    .payment(Payment.builder().id(1L).build())
                    .price(request.getPriceAmount())
                    .build();
            paymentDetailRepo.save(paymentDetailLan1Nd);

            PaymentDetail paymentDetail2Nd = PaymentDetail.builder()
                    .bill(bill)
                    .payment(Payment.builder().id(2L).build())
                    .price(bill.getPriceReduce().subtract(request.getPriceAmount()))
                    .build();
            paymentDetailRepo.save(paymentDetail2Nd);
        } else {
            PaymentDetail paymentDetail = PaymentDetail.builder()
                    .bill(bill)
                    .payment(Payment.builder().id(request.getPaymentDetailId()).build())
                    .price(request.getPrice())
                    .build();
            paymentDetailRepo.save(paymentDetail);
        }

        if (request.getBillType().equals("In-Store")) {
            for (int i = 0; i < 2; i++) {
                String n = String.valueOf((i + 1));
                Timeline timeline = new Timeline();
                timeline.setBill(bill);
                timeline.setStatus(n);
                timeLineRepo.save(timeline);
            }
        } else {
            Timeline timeline = new Timeline();
            timeline.setBill(bill);
            timeline.setStatus("1");
            timeLineRepo.save(timeline);
        }

        if (request.getVoucherCode() != null) {
            Voucher voucher = voucherService.findVoucherByVoucherCode(request.getVoucherCode());
            if(voucher.getLimitQuantity() <= 1){
                voucher.setStatus(Const.STATUS_INACTIVE);
            }
            voucher.setLimitQuantity(voucher.getLimitQuantity() - 1);
            voucherService.updateVoucher(voucher);

            BigDecimal calculatedPrice = bill.getPrice().subtract(bill.getPriceReduce());
            if (calculatedPrice.compareTo(BigDecimal.ZERO) == 0) {
                calculatedPrice = bill.getPriceReduce();
            }

            VoucherHistory voucherHistory = VoucherHistory.builder()
                    .bill(bill)
                    .priceReduce(calculatedPrice)
                    .voucherCode(request.getVoucherCode())
                    .build();
            voucherHistoryService.saveVoucherHistory(voucherHistory);

            if (request.getAccountId() != null && request.getVoucherCode() != null) {
                VoucherAccount voucherAccount =
                        voucherAccountService.findVoucherAccountByUsernameAndVoucherCode(request.getAccountId(), request.getVoucherCode());
                if (voucherAccount != null) {
                    voucherAccount.setStatus(Const.STATUS_USED);
                    voucherAccountService.updateStatus(voucherAccount);
                }
            }
        }

        return kafkaUtil.sendingObjectWithKafka(bill, Const.TOPIC_CREATE_BILL);
    }

    @Override
    public List<BillManagementResponse> getAllBillManagement(
            String billCode,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String status,
            String symbol,
            Integer count,
            String createdBy,
            String billType) {
        return billRepo.getAllBillManagement(billCode, startDate, endDate, status, symbol,
                count, createdBy, billType);
    }

    @Override
    public Bill findBillByBillCode(String billCode) {
        return billRepo.findBillByBillCode(billCode);
    }

    @Override
    public CountQuantityBillResponse getCountFilterBill(String billType, LocalDateTime startDate, LocalDateTime endDate) {
        CountQuantityBillResponse countQuantityBillResponse = new CountQuantityBillResponse();
        countQuantityBillResponse
                .setCountAll(billRepo.getAllBillManagement(null, startDate, endDate,
                        null, null, null, null, billType).size());
        countQuantityBillResponse
                .setCountConfirmS(billRepo.getAllBillManagement(null, startDate, endDate,
                        null, "Shipping", 2, null, billType).size());
        countQuantityBillResponse
                .setCountConfirmW(billRepo.getAllBillManagement(null, startDate, endDate,
                        null, null, null, "CLIENT", billType).size());
        countQuantityBillResponse
                .setShipping(billRepo.getAllBillManagement(null, startDate, endDate,
                        null, "Shipping", 3, null, billType).size());
        countQuantityBillResponse.setCancel(billRepo.getAllBillManagement(null, startDate, endDate,
                "Cancel", null, null, null, billType).size());
        countQuantityBillResponse.setComplete(billRepo.getAllBillManagement(null, startDate, endDate,
                "Complete", null, null, null, billType).size());
        countQuantityBillResponse.setPaid(billRepo.getAllBillManagement(null, startDate, endDate,
                "Paid", null, null, null, billType).size());
        countQuantityBillResponse.setUnpaid(billRepo.getAllBillManagement(null, startDate, endDate,
                "UnPaid", null, null, null, billType).size());
        countQuantityBillResponse.setReturnS(billRepo.getAllBillManagement(null, startDate, endDate,
                "ReturnS", null, null, null, billType).size());
        return countQuantityBillResponse;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteBill(Long id) {
        Bill bill = billRepo.findById(id).orElse(null);
        if (bill == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        billRepo.deleteById(id);
    }

    @Override
    public Bill getAllBillByCode(String billCode) {
        return null;
    }

    @Override
    public List<GetListCustomer> getListCustomer() {
        return billRepo.getListCustomer();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Integer updateBillStatus(BillStatusDTO dto) throws JsonProcessingException {
        log.warn("BillStatusDTORequest: " + dto);

        Bill bill = billRepo.findById(dto.getId()).orElse(null);
        bill.setStatus(dto.getStatus());
        bill.setAmountPaid(dto.getAmountPaid());
        if (dto.getTimelineStatus().equals("4")) {
            bill.setCompletionDate(LocalDateTime.now());
        }

        billRepo.save(bill);
        if (dto.getStatus().equals("Cancel")) {
            VoucherHistory voucherHistory = voucherHistoryService.findHistoryByBillCode(bill.getBillCode());
            if (voucherHistory != null) {
                VoucherAccount voucherAccount = voucherAccountService
                        .findVoucherAccountByUsernameAndVoucherCode(bill.getAccount().getUsername(), voucherHistory.getVoucherCode());
                Voucher voucher = null;
                if (voucherAccount != null) {
                    voucherAccount.setStatus(Const.STATUS_ACTIVE);
                    voucher = voucherAccount.getVoucherAccount();
                    voucherAccountService.updateStatus(voucherAccount);
                } else {
                    voucher = voucherService.findVoucherByVoucherCode(voucherHistory.getVoucherCode());
                }
                voucher.setLimitQuantity(voucher.getLimitQuantity() + 1);
                voucherService.updateVoucher(voucher);
            }
        }
        kafkaUtil.sendingObjectWithKafka(dto, Const.TOPIC_TIME_LINE);
        return 1;
    }

    @Override
    public List<Address> getListAddressByUserName(String username) {
        return billRepo.getListAddressByUsername(username);
    }

    @Override
    public Bill findBillByBillId(Long id) {
        return billRepo.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
    }

    @Override
    public BillRevenueDisplay getBillRevenue(LocalDateTime dayFrom, LocalDateTime dayTo) {
        BillRevenue revenue = billRepo.getBillRevenue(dayFrom, dayTo);
        BillRevenueDisplay billRevenueDisplay = new BillRevenueDisplay(revenue);
        List<ProductDetailSellResponse> productDetailDisplayResponses = this.getProductInBillByStatusAndId(null, dayFrom, dayTo);
        billRevenueDisplay.setProductDetailDisplay(productDetailDisplayResponses);
        return billRevenueDisplay;
    }

    @Override
    public BillRevenueCompare getRevenueInStoreOnlineCompare(LocalDateTime day, LocalDateTime dayTo) {
        BillRevenueCompare billRevenueCompare = new BillRevenueCompare();
        billRevenueCompare.setOnlineRevenue(billRepo.getRevenueInStoreOnlineCompare("Online", day, dayTo) == null ? 0 :
                billRepo.getRevenueInStoreOnlineCompare("Online", day, dayTo));
        billRevenueCompare.setInStoreRevenue(billRepo.getRevenueInStoreOnlineCompare("In-Store", day, dayTo) == null ? 0 :
                billRepo.getRevenueInStoreOnlineCompare("In-Store", day, dayTo));
        billRevenueCompare.setTotalRevenue(billRevenueCompare.getOnlineRevenue() + billRevenueCompare.getInStoreRevenue());
        return billRevenueCompare;
    }

    @Override
    public List<ProductDetailSellResponse> getProductInBillByStatusAndId(Long id, LocalDateTime dayFrom, LocalDateTime dayTo) {
        List<ProductDetailResponse> productSellTheMost = billRepo.getProductInBillByStatusAndIdAndDate(id,
                dayFrom, dayTo);
        List<ProductDetailSellResponse> billProductSellTheMosts = new ArrayList<>();
        for (int i = 0; i < productSellTheMost.size(); i++) {
            ProductDetailDisplayResponse response = new ProductDetailDisplayResponse(productSellTheMost.get(i),
                    productImageService.getProductImageByProductDetailId(productSellTheMost.get(i).getId()));
            ProductDetailSellResponse productDetailSellResponse = new ProductDetailSellResponse(response);
            productDetailSellResponse.setPromotion(promotionService.getPromotionByProductDetailId(productSellTheMost.get(i).getId(), "ACTIVE"));
            billProductSellTheMosts.add(productDetailSellResponse);
        }
        return billProductSellTheMosts;
    }

    @Override
    public BillRevenueCompareDate compareRevenueDate(Integer dayFrom, Integer monthFrom, Integer yearFrom,
                                                     Integer dayTo, Integer monthTo, Integer yearTo) {
        Double revenueFrom = billRepo.getRevenueByTime(dayFrom, monthFrom, yearFrom, dayFrom, monthFrom, yearFrom, null);
        Double revenueTo = billRepo.getRevenueByTime(dayTo, monthTo, yearTo, dayTo, monthTo, yearTo, null);
        BillRevenueCompareDate billRevenueCompareDate = new BillRevenueCompareDate(revenueFrom, revenueTo);
        return billRevenueCompareDate;
    }

    @Override
    public List<BillLineChartResponse> getDataLineChart(Integer dayFrom, Integer monthFrom, Integer yearFrom,
                                                        Integer dayTo, Integer monthTo, Integer yearTo) {
        List<Integer> listYear = new ArrayList<>();
        List<BillLineChartResponse> data = new ArrayList<>();
        for (int i = yearFrom; i <= yearTo; i++) {
            listYear.add(i);
        }
        for (int i = 0; i < listYear.size(); i++) {
            if (monthFrom == null && monthTo == null) {
                addDataLineChart(listYear.get(i), null, null, "y" + listYear.get(i), data);
            } else {
                int monthStart = listYear.size() == 1 ? monthFrom : i == 0 ? monthFrom : 1;
                int monthEnd = listYear.size() == 1 ? monthTo : i == listYear.size() - 1 ? monthTo : 12;
                if (dayFrom == null && dayTo == null) {
                    for (int j = monthStart; j <= monthEnd; j++) {
                        addDataLineChart(listYear.get(i), j, null, "m" + j + "-y" + listYear.get(i), data);
                    }
                } else {
                    for (int j = monthStart; j <= monthEnd; j++) {
                        Calendar calendar = Calendar.getInstance();
                        calendar.set(listYear.get(i), j - 1, 1);
                        int dayStart = (j == monthStart && i == 0) ? dayFrom : 1;
                        int dayEnd = (j == monthEnd && i == listYear.size() - 1) ? dayTo : calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
                        for (int k = dayStart; k <= dayEnd; k++) {
                            addDataLineChart(listYear.get(i), j, k, "d" + k + "-m" + j + "-y" + listYear.get(i), data);
                        }
                    }
                }
            }
        }
        return data;
    }

    private void addDataLineChart(Integer year, Integer month, Integer day, String time, List<BillLineChartResponse> data) {
        String type = "Tại quầy";
        Double revenue = billRepo.getRevenueByTime(day, month, year, day, month, year, "In-Store") == null ? 0 :
                billRepo.getRevenueByTime(day, month, year, day, month, year, "In-Store");
        BillLineChartResponse billRevenue = new BillLineChartResponse(type, time, revenue);
        data.add(billRevenue);
        String typeOnline = "Trực tuyến";
        Double revenueOnline = billRepo.getRevenueByTime(day, month, year, day, month, year, "Online") == null ? 0 :
                billRepo.getRevenueByTime(day, month, year, day, month, year, "Online");
        BillLineChartResponse billRevenueOnline = new BillLineChartResponse(typeOnline, time, revenueOnline);
        data.add(billRevenueOnline);
    }

    @Override
    public List<ProductDetailSellResponse> getProductDetailSellInStore(ProductDetailRequest request, BigDecimal min, BigDecimal maxPrice) {
        List<ProductDetailDisplayResponse> productDetailResponses =
                productDetailService.filterProductDetailsByIdCom(request, min, maxPrice);
        List<ProductDetailSellResponse> productDetailSellResponses = new ArrayList<>();
        for (int i = 0; i < productDetailResponses.size(); i++) {
            ProductDetailSellResponse productDetailSellResponse = new ProductDetailSellResponse(productDetailResponses.get(i));
            productDetailSellResponse.setPromotion(promotionService.getPromotionByProductDetailId(productDetailResponses.get(i).getId(), "ACTIVE"));
            productDetailSellResponses.add(productDetailSellResponse);
        }
        return productDetailSellResponses;
    }

    @Override
    public List<BillReturnRequestResponse> getReturnRequestByStatus(String status) {
        return billRepo.getReturnRequestByStatus(status);
    }

    @Override
    public BillGrowthResponse getGrowthStoreByTime(String time) {
        Double revenue = 0.0;
        Double revenueBefore = 0.0;
        LocalDate now = LocalDate.now();
        if (time.equals("date")) {
            LocalDate before = now.minusDays(1);
            revenue = billRepo.getRevenueByTime(now.getDayOfMonth(), now.getMonthValue(), now.getYear(),
                    now.getDayOfMonth(), now.getMonthValue(), now.getYear(), null);
            revenueBefore = billRepo.getRevenueByTime(before.getDayOfMonth(), before.getMonthValue(), before.getYear(),
                    before.getDayOfMonth(), before.getMonthValue(), before.getYear(), null);
        } else if (time.equals("month")) {
            LocalDate before = now.minusMonths(1);
            revenue = billRepo.getRevenueByTime(null, now.getMonthValue(), now.getYear(),
                    null, now.getMonthValue(), now.getYear(), null);
            revenueBefore = billRepo.getRevenueByTime(null, before.getMonthValue(), before.getYear(),
                    null, before.getMonthValue(), before.getYear(), null);
        } else if (time.equals("year")) {
            LocalDate before = now.minusYears(1);
            revenue = billRepo.getRevenueByTime(null, null, now.getYear(),
                    null, null, now.getYear(), null);
            revenueBefore = billRepo.getRevenueByTime(null, null, before.getYear(),
                    null, null, before.getYear(), null);
        }
        revenue = revenue == null ? 0.0 : revenue;
        revenueBefore = revenueBefore == null ? 0.0 : revenueBefore;
        double growth = ((revenue - revenueBefore) / (revenueBefore < 1 ? 1 : revenueBefore)) * 100;
        BillGrowthResponse response = new BillGrowthResponse(BigDecimal.valueOf(revenue), (float) growth);
        return response;
    }

    @Override
    public BillResponse getBillByBillCode(String billCode) {
        return billRepo.getBillByBillCode(billCode);
    }

    @Override
    public BillReturnResponse getBillReturnByBillCode(String billCode) {
        List<TimelineProductDisplayResponse> lstProduct = new ArrayList<>();
        BillResponse billResponse = billRepo.getBillByBillCode(billCode);
        BillReturnResponse billReturnResponse = new BillReturnResponse(billResponse);
        billReturnResponse.setTimeLines(timeLineRepo.getTimeLineByBillId(billResponse.getId()));
        List<TimelineProductResponse> timelineProductResponses = timeLineRepo.getTimelineProductByBillId(billReturnResponse.getId());
        for (int i = 0; i < timelineProductResponses.size(); i++) {
            TimelineProductDisplayResponse productDisplayResponse = new TimelineProductDisplayResponse(timelineProductResponses.get(i));
            productDisplayResponse.setProductImageResponses(productImageService.getProductImageByProductDetailId(productDisplayResponse.getProductDetailId()));
            List<BillDetail> bd = billRepo.checkProductInPromotionById(productDisplayResponse.getProductDetailId(), billCode);
            if (!bd.isEmpty()) {
                productDisplayResponse.setCheckInPromotion(true);
            } else {
                productDisplayResponse.setCheckInPromotion(false);
            }
            lstProduct.add(productDisplayResponse);
        }
        if (billReturnResponse.getSymbol().equals("Shipping")) {
            DeliveryNote deliveryNote = deliveryNoteService.getDeliveryNoteByBill_Id(billResponse.getId());
            Address address = deliveryNote.getAddress();
            billReturnResponse.setAddress(address.getDescriptionDetail() + " " +
                    address.getWard().substring(0, address.getWard().indexOf("|")) + " " +
                    address.getDistrict().substring(0, address.getDistrict().indexOf("|")) + " " +
                    address.getCity().substring(0, address.getCity().indexOf("|")));
            billReturnResponse.setPhoneNumber(deliveryNote.getPhoneNumber());
            billReturnResponse.setFullName(deliveryNote.getName());
            billReturnResponse.setShippingDate(deliveryNote.getShipDate());
        }
        billReturnResponse.setBillDetails(lstProduct);
        return billReturnResponse;
    }

    @Override
    public Bill updateBill(Bill bill) {
        VoucherHistory voucherHistory = voucherHistoryService.findHistoryByBillCode(bill.getBillCode());
        Double price = bigDecimalConvertDouble(bill.getPrice());
        Double priceReduce = 0d;
        if (voucherHistory != null) {
            Voucher voucher = voucherService.findVoucherByVoucherCode(voucherHistory.getVoucherCode());
            Double condition = voucher == null ? 0d : bigDecimalConvertDouble(voucher.getVoucherCondition());
            if (price > condition && voucher != null) {
                if (voucher.getVoucherMethod().equals("%")) {
                    Double voucherValue = bigDecimalConvertDouble(voucher.getVoucherValue());
                    priceReduce = price * voucherValue / 100;
                    if (priceReduce > bigDecimalConvertDouble(voucher.getVoucherValueMax())) {
                        priceReduce = bigDecimalConvertDouble(voucher.getVoucherValueMax());
                    }
                } else if (voucher.getVoucherMethod().equalsIgnoreCase("VND")) {
                    priceReduce = bigDecimalConvertDouble(voucher.getVoucherValue());
                }
            }
        }
        price = bigDecimalConvertDouble(bill.getPrice()) - priceReduce;
        bill.setPrice(bill.getPrice());
        bill.setPriceReduce(new BigDecimal(price));
        return billRepo.save(bill);
    }

    private Double bigDecimalConvertDouble(BigDecimal value) {
        if (Objects.nonNull(value)) {
            return Double.valueOf(String.valueOf(value));
        }

        return null;
    }

    @Override
    public List<NotificationDTO> findAllNotifications() {
        return billRepo.findAllNotifications();
    }

    @Override
    public Bill updateBillReturn(Long billId, BigDecimal priceReturn, BigDecimal voucherPrice) {
        Bill bill = this.findBillByBillId(billId);
        bill.setPriceReduce(bill.getPriceReduce().subtract(priceReturn));
        bill.setStatus("ReturnS");
        VoucherHistory voucherHistory = voucherHistoryService.findHistoryByBillCode(bill.getBillCode());
        if(voucherHistory != null){
            voucherHistory.setPriceReduce(voucherPrice);
            voucherHistoryService.saveVoucherHistory(voucherHistory);
        }
        return billRepo.save(bill);
    }
}
