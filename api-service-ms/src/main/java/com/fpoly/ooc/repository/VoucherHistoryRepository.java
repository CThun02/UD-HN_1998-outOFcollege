package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.VoucherHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherHistoryRepository extends JpaRepository<VoucherHistory, Long> {

//    @Query(value = "select case when count(*)> 0 then true else false end from bill " +
//            "left join account on bill.account_id = account.username " +
//            "left join voucher_history on voucher_history.bill_id = bill.id " +
//            "where account.username = ?2 " +
//            "and voucher_history.voucher_code = ?1", nativeQuery = true)

    @Query("select new java.lang.Boolean((COUNT(*) > 0)) " +
            "from Bill bill " +
            "left join Account account on bill.account.username = account.username " +
            "left join VoucherHistory vh on vh.bill.id = bill.id " +
            "where vh.voucherCode = :voucherCode " +
            "and account.username = :username ")
    Boolean isCheckUserUsedVoucher(@Param("voucherCode") String voucherCode,
                                   @Param("username") String username);

}
