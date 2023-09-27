package com.fpoly.ooc.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "color")
@Entity
@Builder
public class Color extends BaseEntity{
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name="color_code")
    private String colorCode;

    @Column(name = "color_name")
    private String colorName;

}
