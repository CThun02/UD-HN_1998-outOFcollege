package com.fpoly.ooc.constant;


import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

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
    }

    public static String getMessage(String code) {
        if(StringUtils.isNotEmpty(code)) {
            return errors.get(code);
        } else {
            return "Không tìm thấy nội dung " + code;
        }
    }

}
