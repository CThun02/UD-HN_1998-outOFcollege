package com.fpoly.ooc.entity;

import com.fpoly.ooc.dto.NotificationDTO;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@NamedNativeQuery(
        name = "Bill.findAllNotifications",
        query = """
                    SELECT
                        bill.id AS billId,
                        bill.created_at AS orderDate,
                        timeline.status AS status,
                        product.product_name AS productName,
                        brand.brand_name AS brandName,
                        category.category_name AS categoryName,
                        billDetail.quantity AS quantity,
                        billDetail.price AS price,
                        (SELECT TOP 1 productImage.path FROM DATN_DB_MS.dbo.product_image productImage
                                                     WHERE productImage.product_detail_id = productDetail.id
                                                     AND (productImage.status is null or productImage.status = 'ACTIVE')
                                                    ) AS imagePath
                    FROM DATN_DB_MS.dbo.bill bill
                             LEFT JOIN DATN_DB_MS.dbo.bill_detail billDetail ON bill.id = billDetail.bill_id
                             LEFT JOIN DATN_DB_MS.dbo.product_detail productDetail ON billDetail.product_detail_id = productDetail.id
                             LEFT JOIN DATN_DB_MS.dbo.time_line timeline ON timeline.bill_id = bill.id
                             LEFT JOIN DATN_DB_MS.dbo.product product ON product.id = productDetail.product_id
                             LEFT JOIN DATN_DB_MS.dbo.brand brand ON brand.id = productDetail.brand_id
                             LEFT JOIN DATN_DB_MS.dbo.category category ON category.id = productDetail.category_id
                             LEFT JOIN DATN_DB_MS.dbo.product_image productImage ON productImage.product_detail_id = productDetail.id
                    WHERE
                            lower(bill.bill_type) = lower('online')
                      AND (bill.status = 'wait_for_confirm')
                      AND (productDetail.status is null or productDetail.status = 'ACTIVE')
                      AND (product.status is null or product.status = 'ACTIVE')
                      AND (brand.status is null or brand.status = 'ACTIVE')
                      AND (category.status is null or category.status = 'ACTIVE')
                      AND (productImage.status is null or productImage.status = 'ACTIVE')
                      AND timeline.status = '1'
                    GROUP BY bill.id, bill.created_at, timeline.status, product.product_name,
                             brand.brand_name, category.category_name, billDetail.quantity, billDetail.price,
                             productDetail.id
                    --HAVING (SELECT count(*) FROM DATN_DB_MS.dbo.time_line subTimeline where subTimeline.bill_id = bill.id) = 1
                    ORDER BY bill.created_at DESC
                """,
        resultSetMapping = "Mapping.findAllNotifications"
)

@SqlResultSetMapping(
        name = "Mapping.findAllNotifications",
        classes = @ConstructorResult(
                targetClass = NotificationDTO.class,
                columns = {
                        @ColumnResult(name = "billId", type = Long.class),
                        @ColumnResult(name = "orderDate", type = LocalDateTime.class),
                        @ColumnResult(name = "status", type = String.class),
                        @ColumnResult(name = "productName", type = String.class),
                        @ColumnResult(name = "brandName", type = String.class),
                        @ColumnResult(name = "categoryName", type = String.class),
                        @ColumnResult(name = "quantity", type = Integer.class),
                        @ColumnResult(name = "price", type = BigDecimal.class),
                        @ColumnResult(name = "imagePath", type = String.class)
                }
        )
)

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "bill")
public class Bill extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "bill_code")
    private String billCode;

    @Column(name = "transaction_code")
    private String transactionCode;

    @Column(name = "date_of_receipt")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateOfReceipt;

    @Column(name = "completion_date")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime completionDate;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "price_reduce")
    private BigDecimal priceReduce;

    @Column(name = "amount_paid")
    private BigDecimal amountPaid;

    @Column(name = "bill_type")
    private String billType;

    @Column(name = "symbol")
    private String symbol;

    @Column(name = "note")
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", referencedColumnName = "username")
    private Account account;

    @OneToMany(mappedBy = "bill")
    private List<Timeline> timeLine;

    @OneToMany(mappedBy = "bill")
    private List<BillDetail> billDetails;

    @OneToMany(mappedBy = "bill")
    private List<PaymentDetail> lstPaymentDetail;

}
