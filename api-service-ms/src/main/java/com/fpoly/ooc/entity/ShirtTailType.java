package com.fpoly.ooc.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shirt_tail_type")
@Entity
public class ShirtTailType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "shirt_tail_type_name")
    private String shirtTailTypeName;

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
