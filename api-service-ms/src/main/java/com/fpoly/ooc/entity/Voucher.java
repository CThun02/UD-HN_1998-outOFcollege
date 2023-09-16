package com.fpoly.ooc.entity;

import com.fpoly.ooc.responce.voucher.VoucherResponse;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@NamedNativeQuery(
        name = "Voucher.findAllVoucher",
        query = "select voucher.id as 'voucherId', voucher.voucher_code as 'voucherCode', voucher.voucher_name as 'voucherName',\n" +
                "voucher.voucher_value as 'voucherValue', voucher.voucher_value_max as 'voucherValueMax', voucher.voucher_method as 'voucherMethod',\n" +
                "voucher.limit_quantity as 'limitQuantity', voucher.start_date as 'startDate', voucher.end_date as 'endDate', voucher.status as 'status'\n" +
                "from Voucher voucher\n" +
                "where (?1 is null or voucher.voucher_code like ?1)\n" +
                "and (?2 is null or voucher.voucher_name like ?2)\n" +
                "and (?3 is null or voucher.start_date >= ?3)\n" +
                "and (?4 is null or voucher.end_date <= ?4)\n" +
                "and (?5 is null or voucher.status in (?5))",
        resultSetMapping = "Mapping.VoucherResponse"
)

@SqlResultSetMapping(
        name = "Mapping.VoucherResponse",
        classes = @ConstructorResult(
                targetClass = VoucherResponse.class,
                columns = {
                        @ColumnResult(name = "voucherId", type = Long.class),
                        @ColumnResult(name = "voucherCode", type = String.class),
                        @ColumnResult(name = "voucherName", type = String.class),
                        @ColumnResult(name = "voucherValue", type = BigDecimal.class),
                        @ColumnResult(name = "voucherValueMax", type = BigDecimal.class),
                        @ColumnResult(name = "voucherMethod", type = String.class),
                        @ColumnResult(name = "limitQuantity", type = Integer.class),
                        @ColumnResult(name = "startDate", type = LocalDateTime.class),
                        @ColumnResult(name = "endDate", type = LocalDateTime.class),
                        @ColumnResult(name = "status", type = String.class)
                }
        )
)

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
