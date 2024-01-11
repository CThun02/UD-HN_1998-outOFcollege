package com.fpoly.ooc.service.interfaces;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.dto.NotificationDTO;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.bill.BillGrowthResponse;
import com.fpoly.ooc.responce.bill.BillLineChartResponse;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import com.fpoly.ooc.responce.bill.BillResponse;
import com.fpoly.ooc.responce.bill.BillReturnRequestResponse;
import com.fpoly.ooc.responce.bill.BillReturnResponse;
import com.fpoly.ooc.responce.bill.BillRevenueCompare;
import com.fpoly.ooc.responce.bill.BillRevenueCompareDate;
import com.fpoly.ooc.responce.bill.BillRevenueDisplay;
import com.fpoly.ooc.responce.bill.CountQuantityBillResponse;
import com.fpoly.ooc.responce.product.ProductDetailSellResponse;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface BillService {

    Bill createBill(BillRequest request) throws JsonProcessingException, NotFoundException;

    List<BillManagementResponse> getAllBillManagement(
            String billCode,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String status,
            String symbol,
            Integer count,
            String createdBy,
            String billType);

    Bill findBillByBillCode(String billCode);

    CountQuantityBillResponse getCountFilterBill(String billType, LocalDateTime startDate, LocalDateTime endDate);

    void deleteBill(Long id) throws NotFoundException;

    Bill getAllBillByCode(String billCode);

    List<GetListCustomer> getListCustomer();

    Integer updateBillStatus(BillStatusDTO dto) throws JsonProcessingException, NotFoundException;

    List<Address> getListAddressByUserName(String username);

    Bill findBillByBillId(Long id) throws NotFoundException;

    BillRevenueDisplay getBillRevenue(LocalDateTime dayFrom, LocalDateTime dayTo);

    BillRevenueCompare getRevenueInStoreOnlineCompare(LocalDateTime day, LocalDateTime dayTo);

    List<ProductDetailSellResponse> getProductInBillByStatusAndId(Long id, LocalDateTime dayFrom, LocalDateTime dayTo);

    public BillRevenueCompareDate compareRevenueDate(Integer dayFrom, Integer monthFrom, Integer yearFrom,
                                                     Integer dayTo, Integer monthTo, Integer yearTo);

    List<BillLineChartResponse> getDataLineChart(Integer dayFrom, Integer monthFrom, Integer yearFrom,
                                                 Integer dayTo, Integer monthTo, Integer yearTo);

    List<ProductDetailSellResponse> getProductDetailSellInStore(ProductDetailRequest request, BigDecimal minPrice, BigDecimal maxPrice);

    List<BillReturnRequestResponse> getReturnRequestByStatus(String status);

    BillGrowthResponse getGrowthStoreByTime(String time);

    BillResponse getBillByBillCode(String billCode);

    BillReturnResponse getBillReturnByBillCode(String billCode);

    Bill updateBill(Bill bill) throws NotFoundException;

    List<NotificationDTO> findAllNotifications();

    Bill updateBillReturn(Long billId, BigDecimal priceReturn, BigDecimal voucherPrice, String newVoucher) throws NotFoundException;

    ProductDetailSellResponse getProductDetailSellInStoreByPdId(Long productDetailId);

    ProductDetailSellResponse getProductDetailSellInStoreByPdIdAndColorAndSize(Long productDetailId,Long colorId, Long sizeId);

    Bill saveBill(Bill bill) throws NotFoundException;
}
