package com.fpoly.ooc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "voucher")
@Entity
public class Voucher extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "voucher_code")
    private String voucherCode;

    @Column(name = "voucher_name")
    private String voucherName;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "voucher_value")
    private BigDecimal voucherValue;

    @Column(name = "voucher_value_max")
    private BigDecimal voucherValueMax;

    @Column(name = "voucher_method")
    private String voucherMethod;

    @Column(name = "voucher_condition")
    private BigDecimal voucherCondition;

    @Column(name = "limit_quantity")
    private Integer limitQuantity;

    @OneToMany(mappedBy = "voucherAccount")
    private List<VoucherAccount> voucherAccount;

}
