package com.fpoly.ooc.constant;


public class Const {

    // status
    public static final String STATUS_ACTIVE = "ACTIVE";
    public static final String STATUS_INACTIVE = "INACTIVE";
    public static final String STATUS_UPCOMING = "UPCOMING";
    public static final String STATUS_CANCEL = "CANCEL";
    public static final String STATUS_USED = "USED";

    //error code
    public static final String CODE_NOT_FOUND = "CODE_NOT_FOUND";
    public static final String ID_NOT_FOUND = "ID_NOT_FOUND";
    public static final String VOUCHER_METHOD_EMPTY = "VOUCHER_METHOD_EMPTY";
    public static final String VOUCHER_VALUE_EMPTY = "VOUCHER_VALUE_EMPTY";
    public static final String VOUCHER_VALUE_MAX_EMPTY = "VOUCHER_VALUE_MAX_EMPTY";
    public static final String START_DATE_LESS_DATE_NOW="START_DATE_LESS_DATE_NOW";
    public static final String DATE_LESS_NOW="DATE_LESS_NOW";
    public static final String END_DATE_LESS_DATE_NOW="END_DATE_LESS_DATE_NOW";
    public static final String END_DATE_LESS_START_DATE="END_DATE_LESS_START_DATE";
    public static final String VOUCHER_NAME_ALREADY_EXISTS="VOUCHER_NAME_ALREADY_EXISTS";
    public static final String VOUCHER_VALUE_LESS_100_PERCENT="VOUCHER_VALUE_LESS_100_PERCENT";
    public static final String LIMIT_QUANTITY_LESS_ZERO="LIMIT_QUANTITY_LESS_ZERO";
    public static final String VOUCHER_CONDITION_LESS_ZERO="VOUCHER_CONDITION_LESS_ZERO";
    public static final String STATUS_INVALID = "STATUS_INVALID";
    public static final String SEND_EMAIL_ERROR = "SEND_EMAIL_ERROR";
    public static final String VOUCHER_USED_BY_USER = "VOUCHER_USED_BY_USER";
    public static final String USER_NOT_FOUND = "USER_NOT_FOUND";
    public static final String PROMOTION_NAME_NOT_FOUND = "PROMOTION_NAME_NOT_FOUND";
    public static final String PROMOTION_METHOD_NOT_FOUND = "PROMOTION_METHOD_NOT_FOUND";
    public static final String PROMOTION_VALUE_NOT_FOUND = "PROMOTION_VALUE_NOT_FOUND";
    public static final String START_DATE_NOT_FOUND = "START_DATE_NOT_FOUND";
    public static final String END_DATE_NOT_FOUND = "END_DATE_NOT_FOUND";
    public static final String DATE_NOT_FOUND = "DATE_NOT_FOUND";
    public static final String PRODUCT_DETAIL_NOT_FOUND = "PRODUCT_DETAIL_NOT_FOUND";
    public static final String VOUCHER_END_OF_USE = "VOUCHER_END_OF_USE";
    public static final String VOUCHER_ACCOUNT_NOT_FOUND = "VOUCHER_ACCOUNT_NOT_FOUND";
    public static final String IS_SEND_EMAIL_MEMBER_REQUIRED = "IS_SEND_EMAIL_MEMBER_REQUIRED";
    public static final String ARRAYS_CUSTOMER_NOT_NULL = "ARRAYS_CUSTOMER_NOT_NULL";


    //ErrorCode
    public static final String HTTP_ERROR_CODE = "BAD_REQUEST";

    //kafka
    public static final String KAFKA_SERVER = "localhost:9092";
    public static final String KAFKA_GROUP_ID = "group-id";
    public static final String TOPIC_VOUCHER = "voucher-cronjob";
    public static final String TOPIC_PROMOTION = "promotion-cronjob";


}
