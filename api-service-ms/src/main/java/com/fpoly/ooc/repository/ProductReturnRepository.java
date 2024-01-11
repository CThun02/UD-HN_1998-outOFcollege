package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductReturn;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductReturnRepository extends JpaRepository<ProductReturn, Long> {
    @Query("""
    SELECT
        pd.id AS id,
        pd.product AS product,
        pd.brand AS brand,
        pd.category AS category,
        pd.button AS button,
        pd.pattern AS pattern,
        pd.form AS form,
        pd.material AS material,
        pd.collar AS collar,
        pd.sleeve AS sleeve,
        pd.size AS size,
        pd.color AS color,
        pd.shirtTail AS shirtTail,
        pr.status AS status
    FROM ProductReturn pr
    JOIN ProductDetail pd ON pd.id = pr.productDetail.id 
    WHERE (?1 IS NULL OR pr.createdAt >= ?1)
      AND (?2 IS NULL OR pr.createdAt <= ?2)
      AND pr.status = ?3
    GROUP BY pd.id, product, brand, category, button, pattern, size, color, shirtTail, weight, status, form, material, collar, sleeve, pr.createdAt
    """)
    public List<ProductDetailResponse> getProductReturnByDateAndReason(LocalDateTime day, LocalDateTime dayTo, String reason);

    @Query("Select sum(pr.price) as price from ProductReturn pr where pr.productDetail.id = ?1 and pr.status=?2")
    public BigDecimal sumPriceByPdId(Long productDetailId, String reason);

    @Query("Select sum(pr.quantity) as quantity from ProductReturn pr where pr.productDetail.id = ?1 and pr.status=?2")
    public Integer sumQuantityByPdId(Long productDetailId, String reason);

    @Query("SELECT pr.productDetail.id AS id, pr.productDetail.product AS product, pr.productDetail.brand as brand, pr.productDetail.category as category,  " +
            "pr.productDetail.button AS button, pr.productDetail.pattern as pattern, pr.productDetail.form as form " +
            ", pr.productDetail.material AS material, pr.productDetail.collar AS collar, pr.productDetail.sleeve AS sleeve" +
            ", pr.productDetail.size AS size, pr.productDetail.color AS color, pr.productDetail.shirtTail AS shirtTail" +
            ", pr.price AS price, pr.productDetail.weight as weight, pr.quantity AS quantity, " +
            "  pr.status AS status, pr.note as descriptionDetail" +
            " FROM ProductReturn pr join Bill b on pr.bill.id = b.id" +
            " where b.billCode=?1 ")
    public List<ProductDetailResponse> getProductReturnByBillCode(String billCode);

    @Query("SELECT pr.productDetail.id AS id, pr.productDetail.product AS product, pr.productDetail.brand as brand, pr.productDetail.category as category,  " +
            "pr.productDetail.button AS button, pr.productDetail.pattern as pattern, pr.productDetail.form as form " +
            ", pr.productDetail.material AS material, pr.productDetail.collar AS collar, pr.productDetail.sleeve AS sleeve" +
            ", pr.productDetail.size AS size, pr.productDetail.color AS color, pr.productDetail.shirtTail AS shirtTail" +
            ", pr.price AS price, pr.productDetail.weight as weight, pr.quantity AS quantity, " +
            "  pr.status AS status, pr.note as descriptionDetail from ProductReturn" +
            " pr where pr.productDetail.id=?1 and pr.status like ?2 ")
    public List<ProductDetailResponse> getProductReturnDetailByProductDetailId(Long productDetailId, String reason);
}
