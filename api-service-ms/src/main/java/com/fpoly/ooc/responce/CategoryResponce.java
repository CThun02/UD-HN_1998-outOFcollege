package com.fpoly.ooc.responce;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryResponce {
    private Long id;


    private String categoryName;


    private String status;



}
