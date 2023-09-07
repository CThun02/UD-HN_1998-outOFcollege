package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query("select new com.fpoly.ooc.responce.voucher.VoucherResponse(voucher.id, voucher.voucherCode, " +
            "voucher.voucherName, voucher.startDate, voucher.endDate, voucher.voucherValue, " +
            "voucher.voucherValueMax, voucher.voucherMethod, voucher.voucherCondition, " +
            "voucher.limitQuantity, voucher.permission) from Voucher voucher " +
            "where voucher.status = com.fpoly.ooc.constant.Const.VOUCHER_STATUS_ACTIVE")
    List<VoucherResponse> findAllVoucher();

    @Query("select new com.fpoly.ooc.responce.voucher.VoucherResponse(voucher.id, voucher.voucherCode, " +
            "voucher.voucherName, voucher.startDate, voucher.endDate, voucher.voucherValue, " +
            "voucher.voucherValueMax, voucher.voucherMethod, voucher.voucherCondition, " +
            "voucher.limitQuantity, voucher.permission) from Voucher voucher " +
            "where voucher.status = com.fpoly.ooc.constant.Const.VOUCHER_STATUS_ACTIVE")
    Page<VoucherResponse> pageAllVoucher(Pageable pageable);

}
