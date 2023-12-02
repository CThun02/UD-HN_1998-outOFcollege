package com.fpoly.ooc.constant;


public class Const {

    // status
    public static final String STATUS_ACTIVE = "ACTIVE";
    public static final String STATUS_INACTIVE = "INACTIVE";
    public static final String STATUS_UPCOMING = "UPCOMING";
    public static final String STATUS_CANCEL = "CANCEL";
    public static final String STATUS_USED = "USED";
    // role
    public static final String ROLE_EMPLOYEE = "ROLE_EMPLOYEE";
    public static final String ROLE_CUSTOMER = "ROLE_CUSTOMER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

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
    public static final String PASSWORD_NOT_CORRECT = "PASSWORD_NOT_CORRECT";
    public static final String ADDRESS_NOT_FOUND = "ADDRESS_NOT_FOUND";
    public static final String ADD_ENTITY_FAIL = "ADD_ENTITY_FAIL";


    //ErrorCode
    public static final String HTTP_ERROR_CODE = "BAD_REQUEST";

    //kafka
    public static final String KAFKA_SERVER = "localhost:9092";
    public static final String KAFKA_GROUP_ID = "group-id";
    public static final String TOPIC_VOUCHER = "voucher-cronjob";
    public static final String TOPIC_PROMOTION = "promotion-cronjob";
    public static final String JWT_EXCEPTION = "JWT_EXCEPTION";
    public static final String JWT_AUTHENTICATION = "JWT_AUTHENTICATION";
    public static final String JWT_DECODE_EXCEPTION = "JWT_DECODE_EXCEPTION";
    public static final String JWT_USER_ALREADY_EXIST = "JWT_USER_ALREADY_EXIST";
    public static final String JWT_EMAIL_ALREADY_EXIST = "JWT_EMAIL_ALREADY_EXIST";
    public static final String JWT_PHONE_NUMBER_ALREADY_EXIST = "JWT_PHONE_NUMBER_ALREADY_EXIST";
    public static final String JWT_LOGIN_ERROR = "JWT_LOGIN_ERROR";

    //SORTING
    public static final String SORT_BY_CREATE_AT = "SORT_BY_CREATE_AT";
    public static final String SORT_BY_SELLING = "SORT_BY_SELLING";
    public static final String SORT_BY_PRICE_UP = "SORT_BY_PRICE_UP";
    public static final String SORT_BY_PRICE_DOWN = "SORT_BY_PRICE_DOWN";

    //job
    public static final String JOB_EVERY_5_SECONDS = "*/5 * * * * *";

    //topic
    public static final String TOPIC_PRODUCT = "PRODUCT_TOPIC";
    public static final String TOPIC_CATEGORY = "CATEGORY_TOPIC";
    public static final String TOPIC_BRAND = "BRAND_TOPIC";
    public static final String TOPIC_PATTERN = "PATTERN_TOPIC";
    public static final String TOPIC_FORM = "FORM_TOPIC";
    public static final String TOPIC_BUTTON = "BUTTON_TOPIC";
    public static final String TOPIC_COLLAR = "COLLAR_TOPIC";
    public static final String TOPIC_SLEEVE = "SLEEVE_TOPIC";
    public static final String TOPIC_SHIRT_TAILS = "SHIRT_TAILS_TOPIC";
    public static final String TOPIC_MATERIAL = "MATERIAL_TOPIC";
    public static final String TOPIC_SIZE = "SIZE_TOPIC";
    public static final String TOPIC_COLOR = "COLOR_TOPIC";
    public static final String TOPIC_PRODUCT_DETAIL = "PRODUCT_DETAIL_TOPIC";

    public static final String TOPIC_TIME_LINE = "TIME_LINE_TOPIC";
    public static final String TOPIC_CREATE_TIME_LINE = "CREATE_TIME_LINE_TOPIC";
}
