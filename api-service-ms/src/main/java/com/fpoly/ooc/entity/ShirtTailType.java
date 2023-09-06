package com.fpoly.ooc.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shirt_tail_type")
@Entity
@Builder
public class ShirtTailType extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "shirt_tail_name")
    private String shirtTailTypeName;

    @Column(name = "status")
    private String status;
}
