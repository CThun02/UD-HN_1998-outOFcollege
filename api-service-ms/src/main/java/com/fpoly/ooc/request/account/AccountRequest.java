package com.fpoly.ooc.request.account;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class AccountRequest {

    @NotBlank(message = "UserName Không được để trống")
    private String username;

    private String image;

    @NotBlank(message = "Tên Không Được Để Trống!")
    private String fullName;

    @NotBlank(message = "Email Không Được Để Trống!")
    private String email;

    @NotNull(message = "Không Được Để Trống!")
    private Boolean gender;


    private String idNo;

    @NotBlank(message = "SĐT không được để trống")
    private String numberPhone;

    @NotNull(message = "Ngày sinh không được để trống")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    private String city;

    private String district;

    private String ward;

    private String street;

    @NotBlank(message = "Mật Khẩu Không Được Để Trống!")
    private String password;

    private String descriptionDetail;

    private Integer idRole;
}
