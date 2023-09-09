package com.fpoly.ooc.responce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AccountResponce {

    private String image;

    private String fullName;

    private Integer gender;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date createAt;

    private String status;

}
