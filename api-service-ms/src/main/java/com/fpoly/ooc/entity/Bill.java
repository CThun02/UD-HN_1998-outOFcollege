package com.fpoly.ooc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table
@Entity(name = "bill")
public class Bill {

    @Id
    private Long id;



}
