package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.BillStatusDTO;
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
import com.fpoly.ooc.responce.bill.*;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductDetailSellResponse;
import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductImageServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Arrays;
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
                .createdBy(request.getCreatedBy())
                .build();

        bill.setStatus(request.getStatus());
        billRepo.save(bill);

        for (BillDetailRequest billDetailRequest : request.getLstBillDetailRequest()) {
            BillDetail billDetail = BillDetail.builder()
                    .bill(bill)
                    .productDetail(ProductDetail.builder().id(billDetailRequest.getProductDetailId()).build())
                    .price(billDetailRequest.getPrice())
                    .quantity(billDetailRequest.getQuantity())
                    .note("null")
                    .build();
            billDetailRepo.save(billDetail);
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

        VoucherHistory voucherHistory = VoucherHistory.builder()
                .bill(bill)
                .voucherCode(request.getVoucherCode())
                .build();
        voucherHistoryRepository.save(voucherHistory);

        return bill;
    }

    @Override
    public List<BillManagementResponse> getAllBillManagement(
            String billCode,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String status,
            String billType,
            String symbol) {
        return billRepo.getAllBillManagement(billCode,
                startDate, endDate, status, billType, symbol);
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
    public List<GetListCustomer> getListCustomer() {
        return billRepo.getListCustomer();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Integer updateBillStatus(BillStatusDTO dto, Long id) {
        billRepo.update(dto.getStatus(), dto.getAmountPaid(), id);
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
    public BillRevenueDisplay getBillRevenue(String dateString) {
        int yearString = Integer.parseInt(dateString.substring(0, dateString.indexOf("-")));
        int monthString = Integer.parseInt(dateString.substring(dateString.indexOf("-") + 1, dateString.lastIndexOf("-")));
        int dayString = Integer.parseInt(dateString.substring(dateString.lastIndexOf("-") + 1));
        try {
            LocalDateTime dateTime = LocalDateTime.of(yearString, monthString, dayString, 00, 00, 00);
            BillRevenue revenue = billRepo.getBillRevenue(dateTime);
            BillRevenueDisplay billRevenueDisplay = new BillRevenueDisplay(revenue);
            List<ProductDetailSellResponse> productDetailDisplayResponses = new ArrayList<>();
            List<ProductDetailResponse> productDetailResponses = billRepo.getProductInBillByStatusAndIdAndDate
                    (null, null, dateTime, "ACTIVE") != null ? billRepo.getProductInBillByStatusAndIdAndDate
                    (null, null, dateTime, "ACTIVE") : new ArrayList<>();
            for (int i = 0; i < productDetailResponses.size(); i++) {
                ProductDetailDisplayResponse response = new ProductDetailDisplayResponse(productDetailResponses.get(i),
                        productImageService.getProductImageByProductDetailId(productDetailResponses.get(i).getId()));
                ProductDetailSellResponse productDetailSellResponse = new ProductDetailSellResponse(response);
                productDetailSellResponse.setPromotion(promotionService.getPromotionByProductDetailId(response.getId(), "ACTIVE"));
                productDetailDisplayResponses.add(productDetailSellResponse);
            }
            billRevenueDisplay.setProductDetailDisplay(productDetailDisplayResponses);
            return billRevenueDisplay;
        } catch (DateTimeParseException e) {
            System.out.println("Không thể chuyển đổi chuỗi thành LocalDateTime. Chuỗi không hợp lệ.");
            e.printStackTrace();
            return new BillRevenueDisplay(null);
        }

    }

    @Override
    public BillRevenueCompare getRevenueInStoreOnlineCompare() {
        BillRevenueCompare billRevenueCompare = new BillRevenueCompare();
        billRevenueCompare.setOnlineRevenue(billRepo.getRevenueInStoreOnlineCompare("Online") == null ? 1 :
                billRepo.getRevenueInStoreOnlineCompare("Online"));
        billRevenueCompare.setInStoreRevenue(billRepo.getRevenueInStoreOnlineCompare("In-Store") == null ? 0 :
                billRepo.getRevenueInStoreOnlineCompare("In-Store"));
        billRevenueCompare.setTotalRevenue(billRevenueCompare.getOnlineRevenue() + billRevenueCompare.getInStoreRevenue());
        return billRevenueCompare;
    }

    @Override
    public List<ProductDetailSellResponse> getProductInBillByStatusAndId(Long id, String status) {
        List<ProductDetailResponse> productSellTheMost = billRepo.getProductInBillByStatusAndIdAndDate(id, status, null, null);
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
        Double revenueFrom = billRepo.getRevenueByTime(dayFrom, monthFrom, yearFrom, null);
        Double revenueTo = billRepo.getRevenueByTime(dayTo, monthTo, yearTo, null);
        BillRevenueCompareDate billRevenueCompareDate = new BillRevenueCompareDate(revenueFrom, revenueTo);
        return billRevenueCompareDate;
    }

    @Override
    public List<Integer> getBusinessYear() {
        return billRepo.getBusinessYear();
    }

    @Override
    public List<BillLineChartResponse> getDataLineChart(String years) {
        List<Integer> listYear;
        if (years.contains(",")) {
            String[] dataArray = years.split(",");
            listYear = Arrays.stream(dataArray).map(Integer::parseInt).toList();
        } else {
            listYear = List.of(Integer.parseInt(years));
        }
        List<BillLineChartResponse> data = new ArrayList<>();
        LocalDate now = LocalDate.now();
        int yearNow = now.getYear();
        for (int j = 0; j < listYear.size(); j++) {
            int month = yearNow == listYear.get(j) ? now.getMonthValue() : 12;
            for (int i = 1; i <= month; i++) {
                String type = "Tại quầy";
                String time = "th" + i + "-" + listYear.get(j);
                Double revenue = billRepo.getRevenueByTime(null, i, listYear.get(j), "In-Store") == null ? 0 :
                        billRepo.getRevenueByTime(null, i, listYear.get(j), "In-Store");
                BillLineChartResponse billRevenue = new BillLineChartResponse(type, time, revenue);
                data.add(billRevenue);
            }
            for (int i = 1; i <= month; i++) {
                String type = "Trực tuyến";
                String time = "th" + i + "-" + listYear.get(j);
                Double revenue = billRepo.getRevenueByTime(null, i, listYear.get(j), "Online") == null ? 0 :
                        billRepo.getRevenueByTime(null, i, listYear.get(j), "Online");
                BillLineChartResponse billRevenue = new BillLineChartResponse(type, time, revenue);
                data.add(billRevenue);
            }
        }
        return data;
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
}
