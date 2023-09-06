package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.VoucherAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherAccountRepository extends JpaRepository<VoucherAccount, Long> {
}
