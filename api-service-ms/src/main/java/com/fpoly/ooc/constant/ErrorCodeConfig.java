package com.fpoly.ooc.constant;


import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Data
public class ErrorCodeConfig {

    private static Map<String, String> errors = new HashMap<>();

    static {
        errors.put("CODE_NOT_FOUND", "Mã không tồn tại");
        errors.put("ID_NOT_FOUND", "Id không tồn tại");
        errors.put("START_DATE_LESS_DATE_NOW", "Ngày bắt đầu phải lớn hơn ngày hiện tại");
        errors.put("END_DATE_LESS_DATE_NOW", "Ngày kết thúc phải lớn hơn ngày hiện tại");
        errors.put("END_DATE_LESS_START_DATE", "Ngày kết thúc phải lớn hơn ngày bắt đầu");
        errors.put("VOUCHER_NAME_ALREADY_EXISTS", "Tên voucher đã tồn tại");
        errors.put("VOUCHER_VALUE_LESS_100_PERCENT", "Không được quá 100%");
        errors.put("LIMIT_QUANTITY_LESS_ZERO", "Số lượng lớn hơn 0");
        errors.put("VOUCHER_CONDITION_LESS_ZERO", "Điều kiện giảm không được nhỏ hơn 0");
        errors.put("STATUS_INVALID", "Trạng thái không hợp lệ");
        errors.put("VOUCHER_METHOD_EMPTY", "Hình thức giảm không được bỏ trống");
        errors.put("VOUCHER_VALUE_EMPTY", "Giá trị giảm không được bỏ trống");
        errors.put("VOUCHER_VALUE_MAX_EMPTY", "Giá trị giảm tối đa không được bỏ trống");
        errors.put("DATE_LESS_NOW", "Ngày nhỏ hơn ngày hiện tại");
        errors.put("SEND_EMAIL_ERROR", "Gửi email thất bại");
        errors.put("VOUCHER_USED_BY_USER", "Username %s này đã sở hữu voucher này.");
        errors.put("USER_NOT_FOUND", "Không tìm thấy tài khoản này.");
        errors.put("PROMOTION_NAME_NOT_FOUND", "Tên chương trình khuyến mại không được bỏ trống.");
        errors.put("PROMOTION_METHOD_NOT_FOUND", "Hình thức giảm không được bỏ trống.");
        errors.put("PROMOTION_VALUE_NOT_FOUND", "Giá trị giảm không được bỏ trống.");
        errors.put("DATE_NOT_FOUND", "Định dạng ngày không hợp lệ.");
        errors.put("END_DATE_NOT_FOUND", "Định dạng ngày không hợp lệ.");
        errors.put("START_DATE_NOT_FOUND", "Định dạng ngày không hợp lệ.");
        errors.put("VOUCHER_END_OF_USE", "Hết thời gian sử dụng mã giảm giá.");
        errors.put("VOUCHER_ACCOUNT_NOT_FOUND", "Không tìm thấy mã giảm giá với tài khoản hiện tại.");
        errors.put("IS_SEND_EMAIL_MEMBER_REQUIRED", "Gửi cho mã giảm giá cho thành viên là bắt buộc.");
        errors.put("ARRAYS_CUSTOMER_NOT_NULL", "Danh sách khách hàng rỗng.");
        errors.put("JWT_EXCEPTION", "Hết phiên đăng nhập");
        errors.put("JWT_AUTHENTICATION", "Tài khoản không tồn tại.");
        errors.put("JWT_DECODE_EXCEPTION", "Đăng nhập thất bại");
        errors.put("JWT_USER_ALREADY_EXIST", "Tên đăng nhập đã tồn tại");
        errors.put("JWT_EMAIL_ALREADY_EXIST", "Email đã tồn tại");
        errors.put("JWT_PHONE_NUMBER_ALREADY_EXIST", "Số điện thoại đã tồn tại");
        errors.put("JWT_LOGIN_ERROR", "Tài khoản hoặc mật khẩu không chính xác");
        errors.put("PASSWORD_NOT_CORRECT", "Mật khẩu không chính xác");
        errors.put("ADDRESS_NOT_FOUND", "Địa chỉ không chính xác");
        errors.put("ADD_ENTITY_FAIL", "Thêm thất bại.");
    }

    public static String getMessage(String code) {
        if(StringUtils.isNotEmpty(code)) {
            return errors.get(code);
        } else {
            return "Không tìm thấy nội dung " + code;
        }
    }

    public static String getFormatMessage(String code, Object... objects) {
        if(StringUtils.isNotBlank(code)) {
            return String.format(errors.get(code), objects);
        } else {
            return String.format(errors.get(code));
        }
    }

}
