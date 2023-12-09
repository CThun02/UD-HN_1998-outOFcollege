package com.fpoly.ooc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fpoly.ooc.responce.productdetail.ProductDetailShop;
import com.fpoly.ooc.responce.productdetail.ProductsDetailsResponse;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@NamedNativeQuery(
        name = "ProductDetail.getProductDetailsTableByConditionDTO",
        query = """
                select pd.id as 'ProductDetailsId',
                       p.product_code as 'ProductCode',
                       p.product_name as 'ProductName',
                       bt.button_name as 'ButtonName',
                       m.material_name as 'MaterialName',
                       ct.collar_type_name as 'CollarName',
                       st.seleeve_name as 'SleeveName',
                       s.size_name as 'Size',
                       c.color_code as 'Color',
                       stt.shirt_tail_name as 'ShirtTailName',
                       pd.price as 'Price',
                       pd.quantity as 'Quantity',
                       pd.description_detail as 'Description',
                       pd.status as 'Status',
                       (
                            select
                                CASE
                                   WHEN COUNT(ppd.product_detail_id) > 0
                                   THEN CAST(1 AS bit)
                                   ELSE CAST(0 AS bit)
                                END
                            from promotion_product_detail ppd left join promotion p on ppd.promotion_id = p.id
                            where (ppd.product_detail_id is null or (pd.id = ppd.product_detail_id and p.status = 'ACTIVE'))
                       ) AS 'ProductInPromotion'
                from product_detail pd
                         left join product p on pd.product_id = p.id
                         left join button_type bt on pd.button_id = bt.id
                         left join material m on pd.material_id = m.id
                         left join collar_type ct on pd.collar_id = ct.id
                         left join sleeve_type st on pd.sleeve_id = st.id
                         left join shirt_tail_type stt on pd.shirt_tail_id = stt.id
                         left join size s on pd.size_id = s.id
                         left join color c on pd.color_id = c.id
                where pd.status = 'ACTIVE'
                  and p.status = 'ACTIVE'
                  and bt.status = 'ACTIVE'
                  and m.status = 'ACTIVE'
                  and ct.status = 'ACTIVE'
                  and st.status = 'ACTIVE'
                  and stt.status = 'ACTIVE'
                  and s.status = 'ACTIVE'
                  and c.status = 'ACTIVE'
                  and pd.quantity > 0
                  and (p.id in ?1)
                  and (?2 is null or bt.id = ?2)
                  and (?3 is null or m.id = ?3)
                  and (?4 is null or ct.id = ?4)
                  and (?5 is null or st.id = ?5)
                  and (?6 is null or stt.id = ?6)
                  and (?7 is null or s.id = ?7)
                  and (?8 is null or c.id = ?8)
                  and (?9 is null or p.product_name like ?9 or p.product_code like ?9)
                  
                  group by pd.id, p.product_code, p.product_name, bt.button_name, m.material_name,
                  ct.collar_type_name, st.seleeve_name, s.size_name, stt.shirt_tail_name, c.color_code,
                           pd.price, pd.quantity, pd.description_detail, pd.status
                  ORDER BY
                      CASE
                          WHEN COUNT(pd.id) > 0 THEN 1
                          ELSE 0
                      END ASC;
                """,
        resultSetMapping = "Mapping.ProductsDetailsResponse"
)

@NamedNativeQuery(name = "ProductDetail.getAllProductDetailShop",
        query = """
            SELECT
                    pt.id               AS 'ProductId',
                    br.id               AS 'BrandId',
                    cy.id               AS 'CategoryId',
                    patt.id             AS 'PatternId',
                    f.id                AS 'FormId',
                    button.id           AS 'ButtonId',
                    mate.id             AS 'MaterialId',
                    collar.id           AS 'CollarId',
                    sleeve.id           AS 'SleeveId',
                    shirtTail.id        AS 'ShirtTailId',
                    c.category_name     AS 'CategoryName',
                    pt.product_name     AS 'ProductName',
                    br.brand_name       AS 'BrandName',
                    pn.promotion_method AS 'PromotionMethod',
                    pn.promotion_value  AS 'PromotionValue',
                    MIN(pd.price)       AS 'MinPrice',
                    MAX(pd.price)       AS 'MaxPrice'

                    FROM product_detail pd
                    LEFT JOIN product_image pie ON pd.id = pie.product_detail_id
                    LEFT JOIN category c ON c.id = pd.category_id
                    LEFT JOIN product pt ON pt.id = pd.product_id
                    LEFT JOIN brand b ON b.id = pd.brand_id
                    LEFT JOIN color cor ON cor.id = pd.color_id
                    LEFT JOIN size se ON se.id = pd.size_id
                    LEFT JOIN promotion_product_detail pp ON pd.id = pp.product_detail_id
                    LEFT JOIN promotion pn ON pn.id = pp.promotion_id
                    LEFT JOIN brand br ON br.id = pd.brand_id
                    LEFT JOIN category cy ON cy.id = pd.category_id
                    LEFT JOIN pattern patt ON patt.id = pd.pattern_id
                    LEFT JOIN form f ON f.id = pd.form_id
                    LEFT JOIN button_type button ON button.id = pd.button_id
                    LEFT JOIN material mate ON mate.id = pd.material_id
                    LEFT JOIN collar_type collar ON collar.id = pd.collar_id
                    LEFT JOIN sleeve_type sleeve ON sleeve.id = pd.sleeve_id
                    LEFT JOIN shirt_tail_type shirtTail ON shirtTail.id = pd.shirt_tail_id

                    WHERE
                        pd.status = 'ACTIVE'
                        AND (pie.product_detail_id is null or pie.status = 'ACTIVE')
                        AND (pp.product_detail_id is null or pp.status = 'ACTIVE')
                        AND pt.status = 'ACTIVE'
                        AND c.status = 'ACTIVE'
                        AND br.status = 'ACTIVE'
                        AND cy.status = 'ACTIVE'
                        AND patt.status = 'ACTIVE'
                        AND f.status = 'ACTIVE'
                        AND button.status = 'ACTIVE'
                        AND mate.status = 'ACTIVE'
                        AND collar.status = 'ACTIVE'
                        AND sleeve.status = 'ACTIVE'
                        AND shirtTail.status = 'ACTIVE'
                        AND (pp.promotion_id is null or pn.status = 'ACTIVE')
                        AND (?1 IS NULL OR lower(pt.product_name) LIKE ?1 OR lower(c.category_name) LIKE ?1 OR lower(br.brand_name) like ?1
                            OR lower(cy.category_name) LIKE ?1 OR lower(patt.pattern_name) LIKE ?1 OR lower(f.form_name) LIKE ?1
                            OR lower(mate.material_name) LIKE ?1 OR lower(collar.collar_type_name) LIKE ?1 OR sleeve.seleeve_name LIKE ?1
                            OR lower(shirtTail.shirt_tail_name) LIKE ?1
                        )
                        AND (?2 IS NULL OR pp.money_after >= ?2 OR pd.price >= ?2)
                        AND (?3 IS NULL OR pp.money_after <= ?3 OR pd.price <= ?3)
                        AND (?4 = '' OR c.id IN (?8))
                        AND (?5 = '' OR b.id IN (?9))
                        AND (?6 = '' OR cor.id IN (?10))
                        AND (?7 = '' OR se.id IN (?11))
                    GROUP BY pt.id, br.id, cy.id, patt.id, f.id, button.id, mate.id, collar.id, sleeve.id, shirtTail.id,
                     c.category_name, pt.product_name, br.brand_name, pn.promotion_method, pn.promotion_value
        """, resultSetMapping = "Mapping.ProductDetailShop")

@SqlResultSetMapping(
        name = "Mapping.ProductsDetailsResponse",
        classes = @ConstructorResult(
                targetClass = ProductsDetailsResponse.class,
                columns = {
                        @ColumnResult(name = "ProductDetailsId", type = Long.class),
                        @ColumnResult(name = "ProductCode", type = String.class),
                        @ColumnResult(name = "ProductName", type = String.class),
                        @ColumnResult(name = "ButtonName", type = String.class),
                        @ColumnResult(name = "MaterialName", type = String.class),
                        @ColumnResult(name = "CollarName", type = String.class),
                        @ColumnResult(name = "SleeveName", type = String.class),
                        @ColumnResult(name = "Size", type = String.class),
                        @ColumnResult(name = "Color", type = String.class),
                        @ColumnResult(name = "ShirtTailName", type = String.class),
                        @ColumnResult(name = "Price", type = BigDecimal.class),
                        @ColumnResult(name = "Quantity", type = Integer.class),
                        @ColumnResult(name = "Description", type = String.class),
                        @ColumnResult(name = "Status", type = String.class),
                        @ColumnResult(name = "ProductInPromotion", type = Boolean.class)
                }
        )
)

@SqlResultSetMapping(name = "Mapping.ProductDetailShop",
        classes = @ConstructorResult(
                targetClass = ProductDetailShop.class,
                columns = {
                        @ColumnResult(name = "ProductId", type = Long.class),
                        @ColumnResult(name = "BrandId", type = Long.class),
                        @ColumnResult(name = "CategoryId", type = Long.class),
                        @ColumnResult(name = "PatternId", type = Long.class),
                        @ColumnResult(name = "FormId", type = Long.class),
                        @ColumnResult(name = "ButtonId", type = Long.class),
                        @ColumnResult(name = "MaterialId", type = Long.class),
                        @ColumnResult(name = "CollarId", type = Long.class),
                        @ColumnResult(name = "SleeveId", type = Long.class),
                        @ColumnResult(name = "ShirtTailId", type = Long.class),
                        @ColumnResult(name = "CategoryName", type = String.class),
                        @ColumnResult(name = "ProductName", type = String.class),
                        @ColumnResult(name = "BrandName", type = String.class),
                        @ColumnResult(name = "PromotionMethod", type = String.class),
                        @ColumnResult(name = "PromotionValue", type = BigDecimal.class),
                        @ColumnResult(name = "MinPrice", type = BigDecimal.class),
                        @ColumnResult(name = "MaxPrice", type = BigDecimal.class),
                }
        )
)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_detail")
@Entity
@Builder
public class ProductDetail extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private  Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pattern_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Pattern pattern;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Form form;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "button_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ButtonType button;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Material material;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collar_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private CollarType collar;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sleeve_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private SleeveType sleeve;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Size size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Color color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shirt_tail_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ShirtTailType shirtTail;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "weight")
    private Float weight;

    @Column(name = "description_detail")
    private String descriptionDetail;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(mappedBy = "productDetailId")
    private List<PromotionProduct> promotionProductList;

}
