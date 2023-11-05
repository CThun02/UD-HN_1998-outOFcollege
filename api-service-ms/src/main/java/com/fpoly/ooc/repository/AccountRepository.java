package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.responce.account.AccountVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    @Query("SELECT new com.fpoly.ooc.responce.account.AccountResponce(a.username,a.avatar, a.fullName, a.gender," +
            " a.numberPhone, a.email,a.status)" +
            "FROM Account a where a.role.id=?1 and ((a.fullName like ?2 or ?2 is null) " +
            "or (a.numberPhone like?2 or ?2 is null ))")
    List<AccountResponce> getAllByRoleId(Long roleId, String keyword);

    @Query("SELECT a FROM Account a where a.role.id=?1 and ((a.fullName like ?2 or ?2 is null) " +
            "or (a.numberPhone like?2 or ?2 is null ))")
    List<Account> getAllAccountByRoleId(Long roleId, String keyword);

    @Query("SELECT a FROM Account a where a.role.id=?1 and " +
            "(a.numberPhone like ?2 or a.idNo like ?2 or a.email like ?2)")
    Account getAccountByEmailOrIdNoOrNumberPhone(Long id, String keyWords);

    @Query(value = "select email from account " +
            "left join role on account.role_id = role.id " +
            "where role_name = 'CUSTOMER' ", nativeQuery = true)
    List<String> emailAccountList();

    @Query(name = "Account.customerAccountList", nativeQuery = true)
    List<AccountVoucher> customerAccountList(String username, Boolean gender);

    @Query(name = "Account.customerAccountList", nativeQuery = true)
    List<Account> findAllAccount(String username, String email, String numberPhone );

//        @Query("SELECT new com.fpoly.ooc.responce.account.AccountResponce(a.username,a.avatar,a.fullName,a.)" +
//                "FROM Account a where a.role=?1")
//    List<Account> seach(String username);
}