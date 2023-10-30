package com.fpoly.ooc.common;

import lombok.Data;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

@Data
public class Commons {

    public static String lower(String text) {
        if (StringUtils.isEmpty(text) || StringUtils.isBlank(text)) {
            return null;
        }
        return text.toLowerCase();
    }

    public static Boolean isValidList(List<Long> list) {
        return !CollectionUtils.isEmpty(list);
    }

}
