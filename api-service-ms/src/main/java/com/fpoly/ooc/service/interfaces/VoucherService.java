package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.voucher.DisplayVoucherRequest;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherAccountResponse;
import com.fpoly.ooc.responce.voucher.VoucherResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface VoucherService {

    List<VoucherResponse> findAllVoucher(VoucherAndPromotionConditionDTO voucherConditionDTO);

    CompletableFuture<Voucher> saveOrUpdate(VoucherRequest voucherRequest) throws NotFoundException;

    Voucher updateStatus(String code) throws NotFoundException;

    Voucher updateStatus(String code, String status);

    VoucherRequest findVoucherRequestById(Long id);

    Voucher findVoucherById(Long id);

    VoucherRequest findByVoucherCode(String code) throws NotFoundException;

    VoucherRequest getDetailVoucherByCode(String code);

    List<VoucherResponse> searchVoucherByCode(String code);

    Boolean isCheckAccountOwnerVoucher(Long idVoucher, String username);

    List<VoucherResponse> findAllNoFilter();

    List<VoucherResponse> findAllVoucherResponseDisplayModalUsing(DisplayVoucherRequest request);

    Voucher findVoucherByVoucherCode(String voucherCode) throws NotFoundException;

    Voucher isVoucherUsable(String voucherCode);

    Boolean isCheckTimeUse(String voucherCode, String username);

    Voucher updateVoucher(Voucher voucher);

    VoucherResponse autoFillVoucher(DisplayVoucherRequest request);
    
    List<VoucherAccountResponse> getVoucherByUsernameAndVoucherCode(String username, String voucherCode);

    Voucher findVoucherByTimeOrderBill(String voucherCode, LocalDateTime timeOrder);

}
