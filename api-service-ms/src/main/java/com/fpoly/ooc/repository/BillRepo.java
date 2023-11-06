package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.responce.bill.BillProductSellTheMost;
import com.fpoly.ooc.responce.bill.BillRevenue;
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

    @Query("SELECT sum(b.price) from Bill b where b.billType =?1 or ?1 is null")
    Double getRevenueInStoreOnlineCompare(String type);

    @Query(value = "SELECT pd.id as id, pd.product as product, pd.brand as brand, pd.category as category, pd.button as button," +
            "pd.material as material, pd.collar as collar, pd.sleeve as sleeve, pd.pattern as pattern, " +
            "pd.form as form, pd.size as size, pd.color as color, pd.shirtTail as shirtTail, pd.price as price," +
            "pd.weight as weight, pd.quantity as quantity, pd.descriptionDetail as descriptionDetail, pd.status as status," +
            "p.promotionMethod as promotionMethod, p.promotionValue as promotionValue, p.promotionCondition as promotionCondition," +
            "SUM(bd.quantity) as quantitySell " +
            "FROM BillDetail bd " +
            "JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "LEFT JOIN PromotionProduct pp ON pp.productDetailId.id = pd.id " +
            "LEFT JOIN Promotion p ON pp.promotion.id = p.id " +
            "WHERE p.status = 'ACTIVE' " +
            "GROUP BY pd.id, pd.product, pd.brand, pd.category, pd.button, pd.material, pd.collar, pd.sleeve, pd.size," +
            "pd.color, pd.shirtTail, pd.pattern, pd.form, pd.status, p.promotionMethod, p.promotionValue," +
            "p.promotionCondition, pd.price, pd.weight, pd.quantity, pd.descriptionDetail",
            nativeQuery = true)
    List<BillProductSellTheMost> getBillProductSellTheMost();


    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.bill.BillManagementResponse(b.id, b.billCode, COUNT(bd.id)," +
            "   b.price, a.fullName, a.numberPhone, b.createdAt, b.billType, b.symbol, b.status, dn.shipPrice," +
            "   b.priceReduce, b.createdBy) " +
            "FROM Bill b LEFT JOIN Account a ON a.username = b.account.username " +
            "   LEFT JOIN BillDetail bd ON b.id = bd.bill.id " +
            "   LEFT JOIN DeliveryNote dn ON dn.bill.id = b.id " +
            "WHERE (b.billCode like %:billCode% OR :billCode IS NULL) " +
            "   AND (b.createdAt >= :startDate OR :startDate IS NULL) " +
            "   AND (b.createdAt <= :endDate OR :endDate IS NULL) " +
            "   AND (:status IS NULL OR b.status LIKE %:status%) " +
            "   AND (:billType IS NULL OR b.billType LIKE %:billType%) " +
            "   AND (:symbol IS NULL OR b.symbol LIKE %:symbol%) " +
            "GROUP BY b.id, b.billCode, b.price, a.fullName, b.createdAt, b.billType, b.status," +
            "    b.symbol, dn.shipPrice, b.priceReduce, a.numberPhone, b.createdBy " +
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

    @Query("SELECT COUNT(b) AS billSell, SUM(b.price) as grossRevenue FROM Bill " +
            "b WHERE b.createdAt >= ?1")
    BillRevenue getBillRevenue(LocalDateTime startOfDay);

}
