package com.fpoly.ooc.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fpoly.ooc.responce.product.ProductPromotionResponse;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@NamedNativeQuery(
        name = "Product.findProductPromotion",
        query = """
                select p.id                                                             as product_id,
                       p.product_name                                                   as product_name,
                       sum(case when bd.quantity > 0 then bd.quantity else 0 end)       as sell_quantity,
                       min(pd.price)                                                    as min_price,
                       max(pd.price)                                                    as max_price,
                       (select count(*) from product_detail where product_id = p.id)    as quantity_product
                from Product p
                    left join Product_Detail pd
                on p.id = pd.product_id
                    left join Bill_Detail bd on pd.id = bd.product_Detail_id
                    left join Bill bill on bd.bill_id = bill.id
                group by p.product_name, p.id, p.created_at
                having sum (pd.quantity) > 0
                order by p.created_at desc
                """,
        resultSetMapping = "Mapping.ProductPromotionResponse"
)

@SqlResultSetMapping(
        name = "Mapping.ProductPromotionResponse",
        classes = @ConstructorResult(
                targetClass = ProductPromotionResponse.class,
                columns = {
                        @ColumnResult(name = "product_id", type = Long.class),
                        @ColumnResult(name = "product_name", type = String.class),
                        @ColumnResult(name = "sell_quantity", type = Long.class),
                        @ColumnResult(name = "min_price", type = BigDecimal.class),
                        @ColumnResult(name = "max_price", type = BigDecimal.class),
                        @ColumnResult(name = "quantity_product", type = Long.class)
                }
        )
)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
@Entity
@Builder
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private String status;
}
