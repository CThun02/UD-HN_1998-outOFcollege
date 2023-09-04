package com.fpoly.ooc.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_detail")
@Entity
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pattern_id")
    private Pattern pattern;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "button_id")
    private ButtonType button;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "material_id")
    private Material material;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "collar_id")
    private CollarType collar;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sleeve_id")
    private SleeveType sleeve;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "size_id")
    private Size size;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "color_id")
    private Color color;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "form_id")
    private Form form;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shirt_tail_id")
    private ShirtTailType shirtTail;

    @Column(name = "code")
    private String code;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "description_detail")
    private String descriptionDetail;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private Date createAt;

    @Column(name = "updated_at")
    private Date updayteAt;

    @Column(name = "created_by")
    private String createBy;

    @Column(name = "updated_by")
    private String updateBy;

    @Column(name = "deleted_at")
    private Date deleteAt;
}
