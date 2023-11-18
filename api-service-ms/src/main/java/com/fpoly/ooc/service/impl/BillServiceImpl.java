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
    public BillRevenueDisplay getBillRevenue(Integer day, Integer month, Integer year) {;
        BillRevenue revenue = billRepo.getBillRevenue(day, month, year);
        BillRevenueDisplay billRevenueDisplay = new BillRevenueDisplay(revenue);
        List<ProductDetailSellResponse> productDetailDisplayResponses = this.getProductInBillByStatusAndId(null, day, month, year);
        billRevenueDisplay.setProductDetailDisplay(productDetailDisplayResponses);
        return billRevenueDisplay;
    }

    @Override
    public BillRevenueCompare getRevenueInStoreOnlineCompare(Integer day, Integer month, Integer year) {
        BillRevenueCompare billRevenueCompare = new BillRevenueCompare();
        billRevenueCompare.setOnlineRevenue(billRepo.getRevenueInStoreOnlineCompare("Online", day, month, year) == null ? 0 :
                billRepo.getRevenueInStoreOnlineCompare("Online", day, month, year));
        billRevenueCompare.setInStoreRevenue(billRepo.getRevenueInStoreOnlineCompare("In-Store", day, month, year) == null ? 0 :
                billRepo.getRevenueInStoreOnlineCompare("In-Store", day, month, year));
        billRevenueCompare.setTotalRevenue(billRevenueCompare.getOnlineRevenue() + billRevenueCompare.getInStoreRevenue());
        return billRevenueCompare;
    }

    @Override
    public List<ProductDetailSellResponse> getProductInBillByStatusAndId(Long id, Integer day, Integer month, Integer year) {
        List<ProductDetailResponse> productSellTheMost = billRepo.getProductInBillByStatusAndIdAndDate(id,
                day, month, year);
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
    public List<BillLineChartResponse> getDataLineChart(Integer dayFrom, Integer monthFrom, Integer yearFrom,
                                                        Integer dayTo, Integer monthTo, Integer yearTo) {
        List<Integer> listYear = new ArrayList<>();
        List<BillLineChartResponse> data = new ArrayList<>();
        for (int i = yearFrom; i <= yearTo; i++) {
            listYear.add(i);
        }
        for (int i = 0; i < listYear.size(); i++) {
            if(monthFrom == null && monthTo ==null){
                addDataLineChart(listYear.get(i), null, null, "y"+listYear.get(i), data);
            }else{
                int monthStart = listYear.size()==1?monthFrom: i==0?monthFrom: 1;
                int monthEnd = listYear.size()==1?monthTo: i==listYear.size()-1?monthTo:12;
                if(dayFrom == null && dayTo ==null){
                    for (int j = monthStart; j <= monthEnd; j++) {
                        addDataLineChart(listYear.get(i), j, null, "m"+j+"-y"+listYear.get(i), data);
                    }
                }else{
                    for (int j = monthStart; j <= monthEnd; j++) {
                        Calendar calendar = Calendar.getInstance();
                        calendar.set(listYear.get(i), j - 1, 1);
                        int dayEnd = j==monthEnd?dayTo: i == 0 ? dayTo:calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
                        int dayStart = listYear.size()==1?dayFrom: i == 0? dayFrom : 1;
                        for (int k = dayStart; k <= dayEnd; k++) {
                            addDataLineChart(listYear.get(i), j, k, "d"+k+"-m"+j+"-y"+listYear.get(i), data);
                        }
                    }
                }
            }
        }
        return data;
    }

    private void addDataLineChart(Integer year, Integer month, Integer day, String time, List <BillLineChartResponse> data){
        String type = "Tại quầy";
        Double revenue = billRepo.getRevenueByTime(day, month, year, "In-Store") == null ? 0 :
                billRepo.getRevenueByTime(day, month, year, "In-Store");
        BillLineChartResponse billRevenue = new BillLineChartResponse(type, time, revenue);
        data.add(billRevenue);
        String typeOnline = "Trực tuyến";
        Double revenueOnline  = billRepo.getRevenueByTime(day, month, year, "Online") == null ? 0 :
                billRepo.getRevenueByTime(day, month, year, "Online");
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
}
