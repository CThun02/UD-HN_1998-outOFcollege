package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.VoucherHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VoucherHistoryRepository extends JpaRepository<VoucherHistory, Long> {
    public VoucherHistory findVoucherHistoryByBill_BillCodeAndStatus(String billCode, String status);

    public List<VoucherHistory> findVoucherHistoryByBill_BillCode(String billCode);
}
