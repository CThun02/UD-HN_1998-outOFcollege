package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VoucherService {

    List<VoucherResponse> findAllVoucher();

    Page<VoucherResponse> pageAllVoucher(Pageable pageable);

    Voucher saveOrUpdate(VoucherRequest voucherRequest);

    VoucherRequest findVoucherById(Long id);

    void delete(Long id);

}
