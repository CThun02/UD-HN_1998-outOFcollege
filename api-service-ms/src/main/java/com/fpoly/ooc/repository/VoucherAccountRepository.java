package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.VoucherAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoucherAccountRepository extends JpaRepository<VoucherAccount, Long> {

    @Query("select new java.lang.Boolean((COUNT(va) > 0)) " +
            "from  Account account " +
            "join VoucherAccount va on va.accountVoucher.username = account.username " +
            "join Voucher voucher on voucher.id = va.voucherAccount.id " +
            "and account.username = :username " +
            "and voucher.id = :voucherId ")
    Boolean isCheckUserUsedVoucher(@Param("voucherId") Long voucherId,
                                   @Param("username") String username);

    Optional<VoucherAccount> findVoucherAccountByAccountVoucher_UsernameAndVoucherAccount_Id(
            @Param("username") String username,
            @Param("voucherId") Long voucherId
    );

}
