package com.fpoly.ooc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @Column(name = "created_by")
    private String createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", referencedColumnName = "username")
    private Account account;

    @OneToMany(mappedBy = "bill")
    private List<Timeline> timeLine;

    @OneToMany(mappedBy = "bill")
    private List<PaymentDetail> lstPaymentDetail;

}
