package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.dto.VoucherAccountConditionDTO;
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
import com.fpoly.ooc.service.interfaces.VoucherService;
import com.fpoly.ooc.service.kafka.KafkaUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@Service
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
    private VoucherHistoryRepository voucherHistoryRepository;

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
    public Bill createBill(BillRequest request) {
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
                .completionDate(LocalDateTime.now())
                .build();

        bill.setStatus(request.getStatus());
        billRepo.save(bill);

        if (bill.getStatus().equals("Unpaid")
                && !bill.getBillType().equals("In-Store")
        ) {
            if (!request.getEmailDetails().getRecipient().isEmpty()) {
                emailService.sendSimpleMail(request.getEmailDetails());
            }
        }

        for (BillDetailRequest billDetailRequest : request.getLstBillDetailRequest()) {
            BillDetail billDetail = BillDetail.builder()
                    .bill(bill)
                    .productDetail(ProductDetail.builder().id(billDetailRequest.getProductDetailId()).build())
                    .price(billDetailRequest.getPrice())
                    .quantity(billDetailRequest.getQuantity())
                    .note("null")
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

        PaymentDetail paymentDetail = PaymentDetail.builder()
                .bill(bill)
                .payment(Payment.builder().id(request.getPaymentDetailId()).build())
                .price(request.getPrice())
                .build();
        paymentDetailRepo.save(paymentDetail);

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
            VoucherRequest voucher = VoucherRequest.builder()
                    .voucherCode(request.getVoucherCode())
                    .limitQuantity(voucherService.findVoucherByVoucherCode(request.getVoucherCode()).getLimitQuantity() - 1)
                    .build();
            voucherService.saveOrUpdate(voucher);

            VoucherHistory voucherHistory = VoucherHistory.builder()
                    .bill(bill)
                    .priceReduce(bill.getPriceReduce())
                    .voucherCode(request.getVoucherCode())
                    .build();
            voucherHistoryRepository.save(voucherHistory);

            VoucherAccount voucherAccount = new VoucherAccount();
//            voucherAccount.se
        }
        return bill;
    }

    @Override
    public List<BillManagementResponse> getAllBillManagement(
            String billCode,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String status,
            String symbol,
            Integer count,
            String createdBy) {
        return billRepo.getAllBillManagement(billCode,
                startDate, endDate, status, symbol, count, createdBy);
    }

    @Override
    public CountQuantityBillResponse getCountFilterBill() {
        CountQuantityBillResponse countQuantityBillResponse = new CountQuantityBillResponse();
        countQuantityBillResponse
                .setCountAll(billRepo.getAllBillManagement(null, null, null,
                        null, null, null, null).size());
        countQuantityBillResponse
                .setCountConfirmS(billRepo.getAllBillManagement(null, null, null,
                        null, "Shipping", 2, null).size());
        countQuantityBillResponse
                .setCountConfirmW(billRepo.getAllBillManagement(null, null, null,
                        null, null, null, "CLIENT").size());
        countQuantityBillResponse
                .setShipping(billRepo.getAllBillManagement(null, null, null,
                        null, "Shipping", 3, null).size());
        countQuantityBillResponse.setCancel(billRepo.getAllBillManagement(null, null, null,
                "Cancel", null, null, null).size());
        countQuantityBillResponse.setComplete(billRepo.getAllBillManagement(null, null, null,
                "Complete", null, null, null).size());
        countQuantityBillResponse.setPaid(billRepo.getAllBillManagement(null, null, null,
                "Paid", null, null, null).size());
        countQuantityBillResponse.setUnpaid(billRepo.getAllBillManagement(null, null, null,
                "UnPaid", null, null, null).size());
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
                        int dayStart = (j == monthStart && i==0) ? dayFrom : 1;
                        int dayEnd = (j == monthEnd && i==listYear.size()-1) ? dayTo : calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
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
        System.out.println("CHECKKKKKK SL");
        for (int i = 0; i < timelineProductResponses.size(); i++) {
            TimelineProductDisplayResponse productDisplayResponse = new TimelineProductDisplayResponse(timelineProductResponses.get(i));
            productDisplayResponse.setProductImageResponses(productImageService.getProductImageByProductDetailId(productDisplayResponse.getProductDetailId()));
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
        return billRepo.save(bill);
    }
}
