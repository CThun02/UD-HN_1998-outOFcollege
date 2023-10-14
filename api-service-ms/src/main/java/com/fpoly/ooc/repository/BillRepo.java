package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.responce.account.AccountResponce;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import com.fpoly.ooc.responce.bill.BillProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BillRepo extends JpaRepository<Bill, Long> {

    @Query("SELECT new com.fpoly.ooc.responce.account.GetListCustomer(a.username, a.fullName, a.numberPhone, " +
            "   a.email, a.gender,a.status ) " +
            "FROM Account a " +
            "where a.role.id = 2")
    List<GetListCustomer> getListCustomer();

    @Query("SELECT ad.addressDetail " +
            "FROM AddressDetail ad JOIN Address address ON ad.addressDetail.id = address.id " +
            "WHERE ad.accountAddress.username = ?1 ")
    List<Address> getListAddressByUsername(String username);


    @Query("SELECT new com.fpoly.ooc.responce.bill.BillManagementResponse(b.id, b.billCode, COUNT(bd.id)," +
            "   b.price, a.fullName, b.createdAt, b.billType, b.status) " +
            "FROM Bill b LEFT JOIN Account a ON a.username = b.account.username " +
            "   JOIN BillDetail bd ON b.id = bd.bill.id " +
            "WHERE (b.billCode like %:billCode% OR :billCode IS NULL) " +
            "   AND (b.createdAt >= :startDate OR :startDate IS NULL) " +
            "   AND (b.createdAt <= :endDate OR :endDate IS NULL) " +
            "   AND (:status IS NULL OR b.status LIKE %:status%) " +
            "   AND (:billType IS NULL OR b.billType LIKE %:billType%) " +
            "GROUP BY b.id, b.billCode, b.price, a.fullName, b.createdAt, b.billType, b.status " +
            "ORDER BY b.createdAt DESC ")
    Page<BillManagementResponse> getAllBillManagement(Pageable pageable,
                                                      @Param("billCode") String billCode,
                                                      @Param("startDate") LocalDateTime startDate,
                                                      @Param("endDate") LocalDateTime endDate,
                                                      @Param("status") String status,
                                                      @Param("billType") String billType);

}
