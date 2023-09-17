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

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query(name = "Voucher.findAllVoucher", nativeQuery = true)
    List<VoucherResponse> findAllVoucher(String voucherCode,
                                         String voucherName,
                                         LocalDateTime startDate,
                                         LocalDateTime endDate,
                                         String status);

    Optional<Voucher> findVoucherByVoucherCode( String code);
}
