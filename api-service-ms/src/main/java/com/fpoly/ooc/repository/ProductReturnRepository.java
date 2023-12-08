package com.fpoly.ooc.repository;

import com.fpoly.ooc.entity.ProductReturn;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductReturnRepository extends JpaRepository<ProductReturn, Long> {
    @Query("SELECT pr.productDetail.id AS id, pr.productDetail.product AS product, pr.productDetail.brand as brand, pr.productDetail.category as category,  " +
            "pr.productDetail.button AS button, pr.productDetail.pattern as pattern, pr.productDetail.form as form " +
            ", pr.productDetail.material AS material, pr.productDetail.collar AS collar, pr.productDetail.sleeve AS sleeve" +
            ", pr.productDetail.size AS size, pr.productDetail.color AS color, pr.productDetail.shirtTail AS shirtTail" +
            ", pr.price AS price, pr.productDetail.weight as weight, sum(pr.quantity) AS quantity, " +
            "  pr.productDetail.descriptionDetail AS descriptionDetail" +
            " FROM ProductReturn pr where (?1 is null or pr.createdAt >= ?1) and (?2 is null or pr.createdAt <=?2) and pr.reason=?3 " +
            "group by  id, product, brand, category, button, pattern, form, material, collar, sleeve, size, color, shirtTail, price, weight," +
            "descriptionDetail")
    public List<ProductDetailResponse> getProductReturnByDateAndReason(LocalDateTime day, LocalDateTime dayTo, String reason);

    @Query("SELECT pr.productDetail.id AS id, pr.productDetail.product AS product, pr.productDetail.brand as brand, pr.productDetail.category as category,  " +
            "pr.productDetail.button AS button, pr.productDetail.pattern as pattern, pr.productDetail.form as form " +
            ", pr.productDetail.material AS material, pr.productDetail.collar AS collar, pr.productDetail.sleeve AS sleeve" +
            ", pr.productDetail.size AS size, pr.productDetail.color AS color, pr.productDetail.shirtTail AS shirtTail" +
            ", pr.price AS price, pr.productDetail.weight as weight, sum(pr.quantity) AS quantity, " +
            "  pr.reason AS descriptionDetail" +
            " FROM ProductReturn pr join Bill b on pr.bill.id = b.id where b.billCode=?1 " +
            "group by  id, product, brand, category, button, pattern, form, material, collar, sleeve, size, color, shirtTail, price, weight," +
            "descriptionDetail")
    public List<ProductDetailResponse> getProductReturnByBillCode(String billCode);
}
