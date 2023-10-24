package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
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
            "   b.price, a.fullName, b.createdAt, b.billType, b.symbol, b.status, dn.shipPrice, b.priceReduce) " +
            "FROM Bill b LEFT JOIN Account a ON a.username = b.account.username " +
            "   JOIN BillDetail bd ON b.id = bd.bill.id " +
            "   JOIN DeliveryNote dn ON dn.bill.id = b.id " +
            "WHERE (b.billCode like %:billCode% OR :billCode IS NULL) " +
            "   AND (b.createdAt >= :startDate OR :startDate IS NULL) " +
            "   AND (b.createdAt <= :endDate OR :endDate IS NULL) " +
            "   AND (:status IS NULL OR b.status LIKE %:status%) " +
            "   AND (:billType IS NULL OR b.billType LIKE %:billType%) " +
            "   AND (:symbol IS NULL OR b.symbol LIKE %:symbol%) " +
            "GROUP BY b.id, b.billCode, b.price, a.fullName, b.createdAt, b.billType, b.status," +
            "    b.symbol, dn.shipPrice, b.priceReduce " +
            "ORDER BY b.createdAt DESC ")
    List<BillManagementResponse> getAllBillManagement(
            @Param("billCode") String billCode,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("status") String status,
            @Param("billType") String billType,
            @Param("symbol") String symbol);

    @Modifying
    @Query("UPDATE Bill b SET b.status = :status, b.amountPaid = :amountPaid WHERE b.id = :id")
    Integer update(@Param("status") String status,
                   @Param("amountPaid") BigDecimal amountPaid,
                   @Param("id") Long id);

}
