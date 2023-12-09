package com.fpoly.ooc.repository;

import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.dto.UserInfomationDTO;
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
            "where role_name = 'ROLE_CUSTOMER' ", nativeQuery = true)
    List<String> emailAccountList();

    @Query(name = "Account.customerAccountList", nativeQuery = true)
    List<AccountVoucher> customerAccountList(String username, Boolean gender);

    @Query(name = "Account.customerAccountList", nativeQuery = true)
    List<Account> findAllAccount(String username, String email, String numberPhone );

    @Query("select account from Account account " +
            "left join Role role on account.role.id = role.id " +
            "where account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and role.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and role.roleName = com.fpoly.ooc.constant.Const.ROLE_CUSTOMER " +
            "and account.username = ?1 or account.email = ?1 or account.numberPhone = ?1 ")
    List<Account> findLoginByUsername(String username);

    @Query("select account from Account account " +
            "left join Role role on account.role.id = role.id " +
            "where account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and role.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and account.email = ?1")
    Account findLoginByEmail(String email);

    @Query("select account from Account account " +
            "left join Role role on account.role.id = role.id " +
            "where account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and role.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and account.numberPhone = ?1")
    Account findLoginByNumberPhone(String phone);

    @Query("select account from Account account " +
            "left join Role role on account.role.id = role.id " +
            "where account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and role.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and (account.numberPhone = ?1 or account.email = ?1 or account.username = ?1) " +
            "and (role.roleName = com.fpoly.ooc.constant.Const.ROLE_CUSTOMER)")
    Account findAccountCustomerByLogin(String login);

    @Query("select account from Account account " +
            "left join Role role on account.role.id = role.id " +
            "where account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and role.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and (account.numberPhone = ?1 or account.email = ?1 or account.username = ?1) ")
    Account findUserByLogin(String login);


    @Query("""
        select new com.fpoly.ooc.dto.UserInfomationDTO(user.username, user.password,
        user.fullName, user.email, user.numberPhone, user.gender, user.dob) from Account user
        where user.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE and user.username = ?1
    """)
    UserInfomationDTO userInfomationByUsername(String username);

    @Query("select account from Account account " +
            "left join Role role on account.role.id = role.id " +
            "where account.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and role.status = com.fpoly.ooc.constant.Const.STATUS_ACTIVE " +
            "and (account.numberPhone = ?1 or account.email = ?1 or account.username = ?1) " +
            "and (role.roleName = com.fpoly.ooc.constant.Const.ROLE_EMPLOYEE or role.roleName = com.fpoly.ooc.constant.Const.ROLE_ADMIN)")
    Account findEmployeeAndAdmintByLogin(String login);
}