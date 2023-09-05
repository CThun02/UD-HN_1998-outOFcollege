package com.fpoly.ooc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "account")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Account {

    @Id
    @Column(name = "username")
    private String userName;

    @Column(name = "full_name")
    private String fullName;


    @Column(name = "dob")
    private Date dob;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "phone_number")
    private String numberPhone;

    @Column(name = "email")
    private String email;

    @Column(name = "id_no")
    private String cccd;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "password")
    private String password;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private AddressDetail addressDetail;
}
