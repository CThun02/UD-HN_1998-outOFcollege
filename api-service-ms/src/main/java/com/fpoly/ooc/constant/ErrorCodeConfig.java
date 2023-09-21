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
    }

    public static String getMessage(String code) {
        if(StringUtils.isNotEmpty(code)) {
            return errors.get(code);
        } else {
            return "Không tìm thấy nội dung " + code;
        }
    }

}
