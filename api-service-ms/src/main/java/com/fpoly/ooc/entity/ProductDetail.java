package com.fpoly.ooc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

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

    @Column(name = "description_detail")
    private String descriptionDetail;

    @OneToMany(mappedBy = "productDetailId")
    private List<PromotionProduct> promotionProductList;

}
