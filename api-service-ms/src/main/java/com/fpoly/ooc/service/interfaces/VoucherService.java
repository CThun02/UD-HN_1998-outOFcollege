package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.request.voucher.DisplayVoucherRequest;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherAccountResponse;
import com.fpoly.ooc.responce.voucher.VoucherResponse;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface VoucherService {

    List<VoucherResponse> findAllVoucher(VoucherAndPromotionConditionDTO voucherConditionDTO);

    CompletableFuture<Voucher> saveOrUpdate(VoucherRequest voucherRequest);

    Voucher updateStatus(String code);

    Voucher updateStatus(String code, String status);

    VoucherRequest findVoucherRequestById(Long id);

    Voucher findVoucherById(Long id);

    VoucherRequest findByVoucherCode(String code);

    VoucherRequest getDetailVoucherByCode(String code);

    List<VoucherResponse> searchVoucherByCode(String code);

    Boolean isCheckAccountOwnerVoucher(Long idVoucher, String username);

    List<VoucherResponse> findAllNoFilter();

    List<VoucherResponse> findAllVoucherResponseDisplayModalUsing(DisplayVoucherRequest request);

    Voucher findVoucherByVoucherCode(String voucherCode);

    Boolean isCheckTimeUse(String voucherCode, String username);

    Voucher updateVoucher(Voucher voucher);

    VoucherResponse autoFillVoucher(DisplayVoucherRequest request);
    
    List<VoucherAccountResponse> getVoucherByUsernameAndVoucherCode(String username, String voucherCode);

}
