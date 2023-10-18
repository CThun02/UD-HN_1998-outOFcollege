package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query(name = "Voucher.findAllVoucher", nativeQuery = true)
    List<VoucherResponse> findAllVoucher(String voucherCodeOrName,
                                         LocalDateTime startDate,
                                         LocalDateTime endDate,
                                         String status);

    Optional<Voucher> findVoucherByVoucherName(String voucherName);

    Optional<Voucher> findVoucherByVoucherCode(String code);

    @Query("select new java.lang.Boolean((COUNT(*) > 0)) from VoucherAccount va " +
            "where va.voucherAccount.id = :idVoucher and va.accountVoucher.username = :username")
    Boolean isCheckAccountOwnerVoucher(Long idVoucher, String username);

    @Query("select new com.fpoly.ooc.responce.voucher.VoucherResponse(" +
            "v.id, v.voucherCode, v.voucherName, v.voucherValue, v.voucherValueMax, v.voucherMethod, " +
            "v.limitQuantity, v.startDate, v.endDate, v.status, v.objectUse) " +
            "from Voucher v " +
            "order by v.createdAt desc ")
    List<VoucherResponse> findAllVoucherResponseNoCondition();

    @Query("select new com.fpoly.ooc.responce.voucher.VoucherResponse(" +
            "v.id, v.voucherCode, v.voucherName, v.voucherValue, v.voucherValueMax, v.voucherMethod, " +
            "v.limitQuantity, v.startDate, v.endDate, v.status, v.objectUse) " +
            "from Voucher v " +
            "left join VoucherAccount va on v.id = va.voucherAccount.id " +
            "where (:username is null or (va.accountVoucher.username = :username and va.status = 'ACTIVE')) " +
            "and (:priceBill is null or v.voucherCondition <= :priceBill) " +
            "group by v.id, v.voucherCode, v.voucherName, v.voucherValue, v.voucherValueMax, v.voucherMethod, " +
            "v.limitQuantity, v.startDate, v.endDate, v.status, v.objectUse " +
            "order by v.voucherValue desc ")
    List<VoucherResponse> findAllDisplayModalUsingVoucher(@Param("username") String username,
                                                          @Param("priceBill") BigDecimal priceBill);

}
