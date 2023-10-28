package com.fpoly.ooc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
                       p.img_default as 'ImageDefault',
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
                       pd.status as 'Status'
                from product_detail pd
                         left join product p on pd.product_id = p.id
                         left join button_type bt on pd.button_id = bt.id
                         left join material m on pd.material_id = m.id
                         left join collar_type ct on pd.collar_id = ct.id
                         left join sleeve_type st on pd.sleeve_id = st.id
                         left join shirt_tail_type stt on pd.shirt_tail_id = stt.id
                         left join size s on pd.size_id = s.id
                         left join color c on pd.color_id = c.id

                where (pd.status = 'ACTIVE')
                  and (p.id in ?1)
                  and (?2 is null or bt.id = ?2)
                  and (?3 is null or m.id = ?3)
                  and (?4 is null or ct.id = ?4)
                  and (?5 is null or st.id = ?5)
                  and (?6 is null or stt.id = ?6)
                  and (?7 is null or s.id = ?7)
                  and (?8 is null or c.id = ?8)
                  and (?9 is null or p.product_name like ?9 or p.product_code like ?9)
                  
                group by pd.id, p.product_code, p.product_name, p.img_default, bt.button_name, m.material_name, 
                ct.collar_type_name, st.seleeve_name, s.size_name, c.color_code, stt.shirt_tail_name, pd.price,
                pd.quantity, pd.description_detail, pd.status
                """,
        resultSetMapping = "Mapping.ProductsDetailsResponse"
)

@SqlResultSetMapping(
        name = "Mapping.ProductsDetailsResponse",
        classes = @ConstructorResult(
                targetClass = ProductsDetailsResponse.class,
                columns = {
                        @ColumnResult(name = "ProductDetailsId", type = Long.class),
                        @ColumnResult(name = "ProductCode", type = String.class),
                        @ColumnResult(name = "ProductName", type = String.class),
                        @ColumnResult(name = "ImageDefault", type = String.class),
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
                        @ColumnResult(name = "Status", type = String.class)
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

    @OneToMany(mappedBy = "productDetailId")
    private List<PromotionProduct> promotionProductList;

}
