package com.fpoly.ooc.repository;

import com.fpoly.ooc.dto.NotificationDTO;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.responce.bill.*;
import com.fpoly.ooc.responce.account.GetListCustomer;
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
            "   a.email, a.gender,a.status) " +
            "FROM Account a " +
            "where a.role.id = 2")
    List<GetListCustomer> getListCustomer();

    @Query("SELECT ad.addressDetail " +
            "FROM AddressDetail ad JOIN Address address ON ad.addressDetail.id = address.id " +
            "WHERE ad.accountAddress.username = ?1 ")
    List<Address> getListAddressByUsername(String username);

    Bill findBillByBillCode(String billCode);

    @Query("SELECT sum(b.priceReduce) from Bill b where (b.billType like ?1 or ?1 is null) AND b.status not like 'CANCEL'" +
            "  AND b.status not like 'ReturnS' AND " +
            "(?2 IS NULL OR b.createdAt >= ?2) AND (?3 IS NULL OR b.createdAt <= ?3)")
    Double getRevenueInStoreOnlineCompare(String type, LocalDateTime day, LocalDateTime dayTo);

    @Query("SELECT sum(b.priceReduce) FROM Bill b WHERE " +
            "((:dayParam IS NULL OR DAY(b.createdAt) >= :dayParam) and (:dayTo is null or DAY(b.createdAt) <= :dayTo)) AND " +
            "((:monthParam IS NULL OR MONTH(b.createdAt) >= :monthParam) and (:monthTo is null or MONTH(b.createdAt) <= :monthTo)) AND " +
            "((:yearParam IS NULL OR YEAR(b.createdAt) >= :yearParam) and (:yearTo is null or YEAR(b.createdAt) <= :yearTo)) " +
            "AND b.status not like 'CANCEL' and b.status not like 'ReturnS'" +
            "AND (b.billType like :billType or :billType is null)")
    Double getRevenueByTime(@Param("dayParam") Integer day,
                            @Param("monthParam") Integer month,
                            @Param("yearParam") Integer year,
                            @Param("dayTo") Integer dayTo,
                            @Param("monthTo") Integer monthTo,
                            @Param("yearTo") Integer yearTo,
                            @Param("billType") String billType);

    @Query("SELECT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category, pd.button AS button," +
            "       pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve, pd.size AS size," +
            "       pd.color AS color, pd.shirtTail AS shirtTail," +
            "       bd.price AS price, pd.weight as weight, sum(bd.quantity) AS quantity, " +
            "       pd.descriptionDetail AS descriptionDetail, pd.pattern as pattern, pd.form as form, pd.status as status " +
            "FROM BillDetail bd " +
            "JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "WHERE bd.bill.status not like 'CANCEL' and (bd.status not like 'ReturnS' or bd.status is null) and (bd.bill.id = ?1 or ?1 is null) " +
            "AND  (?2 IS NULL OR bd.createdAt >= ?2) AND (?3 IS NULL OR bd.createdAt <= ?3)" +
            "GROUP BY pd.id, pd.product, pd.brand, pd.category, pd.button, pd.material, pd.collar, pd.sleeve, pd.size, " +
            "pd.color, pd.shirtTail, bd.price, pd.weight, pd.descriptionDetail, " +
            "pd.pattern, pd.form, pd.status " +
            "ORDER BY quantity DESC ")
    List<ProductDetailResponse> getProductInBillByStatusAndIdAndDate(Long id, LocalDateTime dayTo, LocalDateTime dayFrom);


    @Query("select b.id as billId, b.billCode as billCode, b.createdBy as employee" +
            ", d.name as customerName, b.createdAt as createdAt, b.status as status from Bill b " +
            "left join DeliveryNote d on d.bill.id = b.id" +
            " where b.status like ?1")
    List<BillReturnRequestResponse> getReturnRequestByStatus(String status);

    @Query("SELECT DISTINCT new com.fpoly.ooc.responce.bill.BillManagementResponse(b.id, b.billCode, COUNT(tl.id)," +
            "   b.price, dn.name, dn.phoneNumber, b.createdAt, b.billType, b.symbol, b.status, dn.shipPrice," +
            "   b.priceReduce, b.createdBy, a.fullName, a.numberPhone) " +
            "FROM Bill b LEFT JOIN Account a ON a.username = b.account.username " +
            "   LEFT JOIN DeliveryNote dn ON dn.bill.id = b.id " +
            "   LEFT JOIN Timeline tl ON tl.bill.id = b.id " +
            "WHERE (b.billCode like %:billCode% OR :billCode IS NULL) " +
            "   AND (b.createdAt >= :startDate OR :startDate IS NULL) " +
            "   AND (b.createdAt <= :endDate OR :endDate IS NULL) " +
            "   AND (:status IS NULL OR b.status LIKE :status) " +
            "   AND (:billType IS NULL OR b.billType LIKE :billType)" +
            "   AND (:createdBy IS NULL OR b.createdBy LIKE :createdBy AND b.status not like 'Cancel') " +
            "   AND (tl.status like '1' or tl.status like '2' or tl.status like '3' or tl.status like '4' " +
            "       or tl.status like '5' or tl.status like '6') " +
            "GROUP BY b.id, b.billCode, b.price, b.createdAt, b.billType, b.status, " +
            "    b.symbol, dn.shipPrice, b.priceReduce, dn.name, dn.phoneNumber, b.createdBy, " +
            "    a.fullName, a.numberPhone " +
            "   having (:symbol IS NULL OR (b.symbol like :symbol and b.status not like 'Cancel' " +
            "       AND (:count IS NULL OR COUNT(tl.id) = :count))) "+
            "ORDER BY b.createdAt DESC ")
    List<BillManagementResponse> getAllBillManagement(
            @Param("billCode") String billCode,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("status") String status,
            @Param("symbol") String symbol,
            @Param("count") Integer count,
            @Param("createdBy") String createdBy,
            @Param("billType") String billType
    );

    @Modifying
    @Query("UPDATE Bill b SET b.status = :status, b.amountPaid = :amountPaid WHERE b.id = :id")
    Integer update(@Param("status") String status,
                   @Param("amountPaid") BigDecimal amountPaid,
                   @Param("id") Long id);

    @Query("SELECT COUNT(b) AS billSell, SUM(b.priceReduce) as grossRevenue FROM Bill " +
            "b WHERE (?1 IS NULL OR b.createdAt >= ?1) AND (?2 IS NULL OR b.createdAt <= ?2) and b.status not like 'CANCEL' ")
    BillRevenue getBillRevenue(LocalDateTime dayFrom, LocalDateTime dayTo);

    @Query("SELECT pd.id AS id, pd.product AS product, pd.brand as brand, pd.category as category, pd.button AS button," +
            "       pd.material AS material, pd.collar AS collar, pd.sleeve AS sleeve, pd.size AS size," +
            "       pd.color AS color, pd.shirtTail AS shirtTail," +
            "       bd.price AS price, pd.weight as weight, bd.quantity AS quantity, " +
            "       pd.descriptionDetail AS descriptionDetail, pd.pattern as pattern, pd.form as form, pd.status as status " +
            "FROM BillDetail bd " +
            "JOIN ProductDetail pd ON pd.id = bd.productDetail.id " +
            "WHERE (bd.bill.id = ?1 or ?1 is null)")
    List<ProductDetailResponse> getProductDetailByBillId(Long id);

    @Query("Select b.id as id, b.billCode as billCode, a.fullName as customerName, a.username as userName, " +
            "b.completionDate as completionDate, b.price as price, b.priceReduce as priceReduce, b.amountPaid as amountPaid," +
            " d.shipPrice as shippingPrice, b.billType as billType, b.symbol as symbol" +
            ", b.createdAt as createdAt, b.createdBy as createdBy, b.status as status, a.numberPhone as numberPhone," +
            "d.phoneNumber as numberPhoneReceived, b.note as note from Bill b " +
            "left join Account a on b.account.username = a.username " +
            "left join DeliveryNote d on d.bill.id = b.id where  b.billCode = ?1")
    BillResponse getBillByBillCode(String billCode);

    @Query("SELECT count(b.id) " +
            "FROM Bill b  " +
            "   LEFT JOIN BillDetail bd ON b.id = bd.bill.id " +
            "   LEFT JOIN Timeline tl ON tl.bill.id = b.id " +
            "WHERE (b.billCode like %:billCode% OR :billCode IS NULL) " +
            "   AND (b.createdAt >= :startDate OR :startDate IS NULL) " +
            "   AND (b.createdAt <= :endDate OR :endDate IS NULL) " +
            "   AND (:status IS NULL OR b.status LIKE :status) " +
            "   AND (:createdBy IS NULL OR b.createdBy LIKE :createdBy AND b.status not like 'Cancel') " +
            "GROUP BY b.id, b.symbol, b.status, tl.id " +
            "   having (:symbol IS NULL OR (b.symbol like :symbol and b.status not like 'Cancel' " +
            "       AND (:count IS NULL OR COUNT(tl.id) = :count))) ")
    List<Integer> getCountFilterBill(
            @Param("billCode") String billCode,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("status") String status,
            @Param("symbol") String symbol,
            @Param("count") Integer count,
            @Param("createdBy") String createdBy);

    @Query("select bd from BillDetail bd join ProductDetail pd on bd.productDetail.id = pd.id " +
            "join PromotionProduct pp on pp.productDetailId.id = pd.id  where pd.id = ?1 and (bd.createdAt>= pp.promotion.startDate " +
            "AND bd.createdAt <= pp.promotion.endDate and bd.bill.billCode=?2) and pp.promotion.status = 'ACTIVE' ")
    List<BillDetail> checkProductInPromotionById(Long productDetailId, String billCode);

    @Query(name = "Bill.findAllNotifications", nativeQuery = true)
    List<NotificationDTO> findAllNotifications();
}
