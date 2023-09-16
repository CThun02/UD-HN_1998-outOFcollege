package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherConditionDTO;
import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VoucherService {

    Page<VoucherResponse> findAllVoucher(Pageable pageable, VoucherConditionDTO voucherConditionDTO);

    Voucher saveOrUpdate(VoucherRequest voucherRequest);

    Voucher updateStatus(Long id);

    VoucherRequest findVoucherRequestById(Long id);

    Voucher findVoucherById(Long id);

}
