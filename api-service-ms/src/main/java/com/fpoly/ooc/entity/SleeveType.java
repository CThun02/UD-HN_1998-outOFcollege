package com.fpoly.ooc.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sleeve_type")
@Entity
@Builder
public class SleeveType extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "seleeve_name")
    private String sleeveName;

    @Column(name = "status")
    private String status;
}
