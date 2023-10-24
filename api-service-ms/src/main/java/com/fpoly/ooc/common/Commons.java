package com.fpoly.ooc.common;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

@Data
public class Commons {

    public static String lower(String text) {
        if (StringUtils.isEmpty(text) || StringUtils.isBlank(text)) {
            return null;
        }
        return text.toLowerCase();
    }

}
