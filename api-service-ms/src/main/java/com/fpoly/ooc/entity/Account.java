package com.fpoly.ooc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fpoly.ooc.responce.account.AccountVoucher;
import jakarta.persistence.Column;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@NamedNativeQuery(
        name = "Account.customerAccountList",
        query = """
                select account.username     as 'username',
                       account.full_name    as 'fullName',
                       account.gender       as 'gender',
                       account.email        as 'email',
                       account.phone_number as 'phoneNumber'
                from account
                         left join role on account.role_id = role.id
                where role.role_name = 'ROLE_CUSTOMER' and account.status = 'ACTIVE'
                and (?1 is null
                    or lower(account.username) like ?1
                    or lower(account.full_name) like ?1
                    or lower(account.email) like ?1
                    or lower(account.phone_number) like ?1
                    )
                and (?2 is null or account.gender = ?2)
                """,
        resultSetMapping = "Mapping.AccountVoucher"
)

@SqlResultSetMapping(
        name = "Mapping.AccountVoucher",
        classes = @ConstructorResult(
                targetClass = AccountVoucher.class,
                columns = {
                        @ColumnResult(name = "username", type = String.class),
                        @ColumnResult(name = "fullName", type = String.class),
                        @ColumnResult(name = "gender", type = Boolean.class),
                        @ColumnResult(name = "email", type = String.class),
                        @ColumnResult(name = "phoneNumber", type = String.class)
                }
        )
)

@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Account extends BaseEntity{

    @Id
    @Column(name = "username")
    private String username;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "dob")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "phone_number")
    private String numberPhone;

    @Column(name = "email")
    private String email;

    @Column(name = "id_no")
    private String idNo;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "password")
    private String password;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "accountAddress", fetch = FetchType.LAZY)
    private List<AddressDetail> addAdress;

}
