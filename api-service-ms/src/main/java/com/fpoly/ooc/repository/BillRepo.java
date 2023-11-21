package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.responce.bill.BillProductSellTheMost;
import com.fpoly.ooc.responce.bill.BillReturnRequestResponse;
import com.fpoly.ooc.responce.bill.BillRevenue;
import com.fpoly.ooc.responce.account.GetListCustomer;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
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

    @Query("SELECT sum(b.price) from Bill b where (b.billType like ?1 or ?1 is null) AND b.status <> 'CANCEL' AND " +
            "(?2 IS NULL OR DAY(b.createdAt) = ?2) AND " +
            "(?3 IS NULL OR MONTH(b.createdAt) = ?3) AND " +
            "(?4 IS NULL OR YEAR(b.createdAt) = ?4)")
    Double getRevenueInStoreOnlineCompare(String type, Integer day, Integer month, Integer year);

    @Query("SELECT sum(b.price) FROM Bill b WHERE " +
            "(:dayParam IS NULL OR DAY(b.createdAt) = :dayParam) AND " +
            "(:monthParam IS NULL OR MONTH(b.createdAt) = :monthParam) AND " +
            "(:yearParam IS NULL OR YEAR(b.createdAt) = :yearParam)  AND b.status <> 'CANCEL' " +
            "AND (b.billType like :billType or :billType is null)")
    Double getRevenueByTime(@Param("dayParam") Integer day,
                            @Param("monthParam") Integer month,
                            @Param("yearParam") Integer year,
                            @Param("billType") String billType);

    @Query("SELECT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category, pd.button AS button," +
            "       pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve, pd.size AS size," +
            "       pd.color AS color, pd.shirtTail AS shirtTail," +
            "       bd.price AS price, pd.weight as weight, sum(bd.quantity) AS quantity, " +
            "       pd.descriptionDetail AS descriptionDetail, pd.pattern as pattern, pd.form as form, pd.status as status " +
            "FROM BillDetail bd " +
            "JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "WHERE bd.bill.status <> 'CANCEL' and (bd.bill.id = ?1 or ?1 is null) " +
            "AND (?2 IS NULL OR DAY(bd.createdAt) = ?2) AND" +
            " (?3 IS NULL OR MONTH(bd.createdAt) = ?3) AND" +
            " (?4 IS NULL OR YEAR(bd.createdAt) = ?4) " +
            "GROUP BY pd.id, pd.product, pd.brand, pd.category, pd.button, pd.material, pd.collar, pd.sleeve, pd.size, " +
            "pd.color, pd.shirtTail, bd.price, pd.weight, pd.descriptionDetail, " +
            "pd.pattern, pd.form, pd.status " +
            "ORDER BY quantity DESC ")
    List<ProductDetailResponse> getProductInBillByStatusAndIdAndDate(Long id,
                                                                     Integer day, Integer month, Integer year);


    @Query("select b.id as billId, b.billCode as billCode, b.createdBy as employee" +
            ", d.name as customerName, b.createdAt as createdAt, b.status as status from Bill b " +
            "left join DeliveryNote d on d.bill.id = b.id" +
            " where b.status like ?1")
    List<BillReturnRequestResponse> getReturnRequestByStatus(String status);

    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.bill.BillManagementResponse(b.id, b.billCode, COUNT(bd.id)," +
            "   b.price, dn.name, dn.phoneNumber, b.createdAt, b.billType, b.symbol, b.status, dn.shipPrice," +
            "   b.priceReduce, b.createdBy, a.fullName, a.numberPhone) " +
            "FROM Bill b LEFT JOIN Account a ON a.username = b.account.username " +
            "   LEFT JOIN BillDetail bd ON b.id = bd.bill.id " +
            "   LEFT JOIN DeliveryNote dn ON dn.bill.id = b.id " +
            "WHERE (b.billCode like %:billCode% OR :billCode IS NULL) " +
            "   AND (b.createdAt >= :startDate OR :startDate IS NULL) " +
            "   AND (b.createdAt <= :endDate OR :endDate IS NULL) " +
            "   AND (:status IS NULL OR b.status LIKE %:status%) " +
            "   AND (:billType IS NULL OR b.billType LIKE %:billType%) " +
            "   AND (:symbol IS NULL OR b.symbol LIKE %:symbol%) " +
            "GROUP BY b.id, b.billCode, b.price, b.createdAt, b.billType, b.status, " +
            "    b.symbol, dn.shipPrice, b.priceReduce, dn.name, dn.phoneNumber, b.createdBy, " +
            "    a.fullName, a.numberPhone " +
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
            "b WHERE (?1 IS NULL OR DAY(b.createdAt) = ?1) AND" +
            " (?2 IS NULL OR MONTH(b.createdAt) = ?2) AND" +
            " (?3 IS NULL OR YEAR(b.createdAt) = ?3)")
    BillRevenue getBillRevenue(Integer day, Integer month, Integer year);

    @Query("SELECT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category, pd.button AS button," +
            "       pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve, pd.size AS size," +
            "       pd.color AS color, pd.shirtTail AS shirtTail," +
            "       bd.price AS price, pd.weight as weight, bd.quantity AS quantity, " +
            "       pd.descriptionDetail AS descriptionDetail, pd.pattern as pattern, pd.form as form, pd.status as status " +
            "FROM BillDetail bd " +
            "JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "WHERE (bd.bill.id = ?1 or ?1 is null)")
    List<ProductDetailResponse> getProductDetailByBillId(Long id);
}
