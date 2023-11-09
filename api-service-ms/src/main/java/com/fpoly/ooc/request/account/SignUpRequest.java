package com.fpoly.ooc.request.account;

import com.fpoly.ooc.validation.AccountValid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SignUpRequest {
    @NotBlank(message = "* Tên tài khoản không được bỏ trống")
    @AccountValid(message = "* Tên tài khoản đã tồn tại")
    private String username;
    @NotBlank(message = "* Mật khẩu không được bỏ trống")
    private String password;
    @NotBlank(message = "* Email không được bỏ trống")
    @AccountValid(message = "* Email đã tồn tại")
    private String email;
    @NotBlank(message = "* Số điện thoại không được bỏ trống")
    @AccountValid(message = "* Số điện thoại đã tồn tại")
    private String phoneNumber;
    @NotBlank(message = "* Họ và tên không được bỏ trống")
    private String fullName;
    private String role;

    public String getRole() {
        if (StringUtils.isEmpty(role) || StringUtils.isBlank(role)) {
            return "CUSTOMER";
        }
        return role;
    }
}
