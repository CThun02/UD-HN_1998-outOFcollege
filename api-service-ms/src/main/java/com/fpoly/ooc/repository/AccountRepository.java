package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.responce.account.AccountVoucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    @Query("SELECT new com.fpoly.ooc.responce.account.AccountResponce(a.username,a.avatar, a.fullName, a.gender, a.createdAt,a.status)" +
            "FROM Account a where a.role.id=?1")
    Page<AccountResponce> phanTrang(Pageable pageable, Long roleId);

    @Query(value = "select email from account", nativeQuery = true)
    List<String> emailAccountList();

        @Query(name = "Account.customerAccountList", nativeQuery = true)
    List<AccountVoucher> customerAccountList(String username, Boolean gender);

}