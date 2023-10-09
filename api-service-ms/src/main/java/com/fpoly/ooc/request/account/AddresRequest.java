package com.fpoly.ooc.request.account;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AddresRequest {

    private String city;


    private String district;


    private String ward;

    private String descriptionDetail;
}
