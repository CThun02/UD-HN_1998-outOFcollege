package com.fpoly.ooc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NamedNativeQuery(
        name = "PromotionProduct.findAllPromotionProduct",
        query = "select p.promotion_code      as 'promotionCode',\n" +
                "       p.promotion_name      as 'promotionName',\n" +
                "       COUNT(pd.id)          as 'productQuantity',\n" +
                "       p.promotion_method    as 'promotionMethod',\n" +
                "       p.promotion_value     as 'promotionValue',\n" +
                "       p.promotion_max_value as 'promotionMaxValue',\n" +
                "       p.promotion_condition as 'promotionCondition',\n" +
                "       p.start_date          as 'startDate',\n" +
                "       p.end_date            as 'endDate',\n" +
                "       p.status              as 'status'\n" +
                "from promotion_product_detail ppd\n" +
                "         left join promotion p on ppd.promotion_id = p.id\n" +
                "         left join product_detail pd on pd.id = ppd.product_detail_id\n" +
                "where (?1 is null\n" +
                "    or p.promotion_code like ?1\n" +
                "    or p.promotion_name like ?1)\n" +
                "  and (?2 is null or p.start_date >= ?2)\n" +
                "  and (?3 is null or p.end_date <= ?3)\n" +
                "  and (?4 is null or p.status = ?4)\n" +
                "group by p.promotion_code, p.promotion_name, p.promotion_method,\n" +
                "         p.promotion_value, p.promotion_max_value, p.promotion_condition,\n" +
                "         p.start_date, p.end_date, p.status, p.created_at \n " +
                "order by p.created_at desc ",
        resultSetMapping = "Mapping.PromotionProductResponse"
)

@SqlResultSetMapping(
        name = "Mapping.PromotionProductResponse",
        classes = @ConstructorResult(
                targetClass = PromotionProductResponse.class,
                columns = {
                        @ColumnResult(name = "promotionCode", type = String.class),
                        @ColumnResult(name = "promotionName", type = String.class),
                        @ColumnResult(name = "productQuantity", type = Integer.class),
                        @ColumnResult(name = "promotionMethod", type = String.class),
                        @ColumnResult(name = "promotionValue", type = BigDecimal.class),
                        @ColumnResult(name = "promotionMaxValue", type = BigDecimal.class),
                        @ColumnResult(name = "promotionCondition", type = String.class),
                        @ColumnResult(name = "startDate", type = LocalDateTime.class),
                        @ColumnResult(name = "endDate", type = LocalDateTime.class),
                        @ColumnResult(name = "status", type = String.class),
                }
        ))

@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "promotion_product_detail")
@Entity
public class PromotionProduct extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "percent_reduce")
    private BigDecimal percentReduce;

    @Column(name = "money_after")
    private BigDecimal moneyAfter;

    @Column(name = "money_reduce")
    private BigDecimal moneyReduce;

    @Column(name = "method_reduce")
    private String methodReduce;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_detail_id")
    private ProductDetail productDetailId;

}
