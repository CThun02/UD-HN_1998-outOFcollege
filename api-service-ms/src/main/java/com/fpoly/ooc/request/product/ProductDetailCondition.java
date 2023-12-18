package com.fpoly.ooc.request.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.common.Commons;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetailCondition {
    private String productName;
    private String minPrice;
    private String maxPrice;
    private List<Long> categories;
    private List<Long> brands;
    private List<Long> colors;
    private List<Long> sizes;
    private String sort;

    public List<Long> getCategories() {
        return isCheckNullList(categories);
    }

    public List<Long> getBrands() {
        return isCheckNullList(brands);
    }

    public List<Long> getColors() {
        return isCheckNullList(colors);
    }

    public String getProductName() {
        return isValidProductName(productName);
    }

    public BigDecimal getMinPrice() {
        return isValidPrice(convertStringToBigDecimal(minPrice));
    }

    public BigDecimal getMaxPrice() {
        return isValidPrice(convertStringToBigDecimal(maxPrice));
    }

    public List<Long> getSizes() {
        return isCheckNullList(sizes);
    }

    public String getSort() {
        return StringUtils.isNotEmpty(Commons.lower(sort)) ? Commons.lower(sort) : null;
    }

    private BigDecimal convertStringToBigDecimal(String value) {
        if (StringUtils.isBlank(value)) {
            return null;
        }

        String replace = null;
        if (value.contains(",")) {
            replace = value.replace(",", "");
        }

        return StringUtils.isNotBlank(replace) ? new BigDecimal(replace) : null;
    }

    private List<Long> isCheckNullList(List<Long> lists) {
        if (CollectionUtils.isEmpty(lists)) {
            return null;
        }
        return lists;
    }

    private String isValidProductName(String name) {
        return StringUtils.isNotEmpty(Commons.lower(name)) ? "%" + Commons.lower(name) + "%" : null;
    }

    private BigDecimal isValidPrice(BigDecimal price) {
        String priceStr = String.valueOf(price);
        if (StringUtils.isEmpty(priceStr) || StringUtils.isBlank(priceStr)) {
            return null;
        }
        return price;
    }
}
