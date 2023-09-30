package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.responce.account.AccountResponce;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account,String> {

    @Query("SELECT new com.fpoly.ooc.responce.account.AccountResponce(a.avatar, a.fullName, a.gender, a.createdAt,a.status)" +
            "FROM Account a ")
    Page<AccountResponce> phanTrang(Pageable pageable);

    @Query(value = "select email from account", nativeQuery = true)
    List<String> emailAccountList();
}