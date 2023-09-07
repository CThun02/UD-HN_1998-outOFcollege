package com.fpoly.ooc.repository.interfaces;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.responce.AccountResponce;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

//    @Query("SELECT new com.fpoly.ooc.responce.AccountResponce(acc.avatar,acc.fullName,acc.gender,acc.createAt,acc.status)" +
//            "FROM Account acc join acc.role r")
//    Page<AccountResponce> phanTrang(Pageable pageable);
}
