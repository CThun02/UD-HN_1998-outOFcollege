package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.BillStatusDTO;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.bill.*;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.responce.product.ProductDetailSellResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface BillService {

    Bill createBill(BillRequest request);

    List<BillManagementResponse> getAllBillManagement(
            String billCode,
            LocalDateTime startDate,
            LocalDateTime endDate,
            String status,
            String billType,
            String symbol);

    void deleteBill(Long id);

    List<GetListCustomer> getListCustomer();

    Integer updateBillStatus(BillStatusDTO dto, Long id);

    List<Address> getListAddressByUserName(String username);

    Bill findBillByBillId(Long id);

    BillRevenueDisplay getBillRevenue(String date);

    BillRevenueCompare getRevenueInStoreOnlineCompare();

    List<ProductDetailSellResponse> getProductInBillByStatusAndId(Long id, String status);

    public BillRevenueCompareDate compareRevenueDate(Integer dayFrom, Integer monthFrom, Integer yearFrom,
                                                     Integer dayTo, Integer monthTo, Integer yearTo);

    List<Integer> getBusinessYear();

    List<BillLineChartResponse> getDataLineChart(String year);

    List<ProductDetailSellResponse> getProductDetailSellInStore(ProductDetailRequest request, BigDecimal minPrice, BigDecimal maxPrice);

}
