package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface VoucherService {

    Page<VoucherResponse> findAllVoucher(Pageable pageable, VoucherAndPromotionConditionDTO voucherConditionDTO);

    Voucher saveOrUpdate(VoucherRequest voucherRequest);

    Voucher updateStatus(String code);

    Voucher updateStatus(String code, String status);

    VoucherRequest findVoucherRequestById(Long id);

    Voucher findVoucherById(Long id);

    VoucherRequest findByVoucherCode(String code);

    Boolean isCheckAccountOwnerVoucher(Long idVoucher, String username);

    List<VoucherResponse> findAllNoFilter();

    List<VoucherResponse> findAllVoucherResponseDisplayModalUsing(String username, BigDecimal priceBill);

    Voucher findVoucherByVoucherCode(String voucherCode);

    Boolean isCheckTimeUse(String voucherCode, String username);

}
