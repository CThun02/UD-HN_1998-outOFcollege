package com.fpoly.ooc.responce.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AccountResponce {

    private String username;

    private String image;

    private String fullName;

    private Boolean gender;

    private LocalDateTime creatAt;

    private String status;


}