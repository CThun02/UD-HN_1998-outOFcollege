package com.fpoly.ooc.responce;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MaterialReponce {


    private Long id;


    private String materialName;

    private String status;
}
