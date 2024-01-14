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
    public static final String USER_NOT_FOUND_BY_EMAIL = "USER_NOT_FOUND_BY_EMAIL";
    public static final String OPERATION_ERROR = "OPERATION_ERROR";
    public static final String HTML_TITLE = "SEND_EMAIL_TEMPLATE_TITLE";
    public static final String HTML_BODY = "SEND_EMAIL_TEMPLATE_BODY";
    public static final String OBJECT_USE_VOUCHER_ALL = "all";
    public static final String OBJECT_USE_VOUCHER_MEMBERS = "member";


    //ErrorCode
    public static final String HTTP_ERROR_CODE = "BAD_REQUEST";

    public static final String ERROR_UPDATE_QUANTITY_PRODUCT_DETAIL = "ERROR_UPDATE_QUANTITY_PRODUCT_DETAIL";
    public static final String ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE = "ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE";
    public static final String ERROR_BUY_PRICE_THAN_FIVE_MILLION = "ERROR_BUY_PRICE_THAN_FIVE_MILLION";
    public static final String ERROR_BILL_THAN_TEN_MILLION = "ERROR_BILL_THAN_TEN_MILLION";
    public static final String ERROR_VOUCHER_USABLE = "ERROR_VOUCHER_USABLE";
    public static final String ERROR_VOUCHER_CODE_NOT_FOUND = "ERROR_VOUCHER_CODE_NOT_FOUND";
    public static final String ERROR_SERVICE = "ERROR_SERVICE";
    public static final String ERROR_BILL_NOT_FOUND = "ERROR_BILL_NOT_FOUND";
    public static final String ERROR_BUY_PRODUCT_NOT_FOUND = "ERROR_BUY_PRODUCT_NOT_FOUND";
    public static final String ERROR_ADD_TO_CART_THAN_QUANTITY = "ERROR_ADD_TO_CART_THAN_QUANTITY";
    public static final String ERROR_PRODUCT_DETAIL_NOT_EMPTY_IN_PROMOTION = "ERROR_PRODUCT_DETAIL_NOT_EMPTY_IN_PROMOTION";
    public static final String ERROR_QUANTITY_INVALID = "ERROR_QUANTITY_INVALID";
    public static final String ERROR_NOT_CANCEL_BILL_WHEN_NOT_STATUS_WAIT_FOR_CONFIRM = "ERROR_NOT_CANCEL_BILL_WHEN_NOT_STATUS_WAIT_FOR_CONFIRM";
    public static final String ERROR_NOT_CANCEL_BILL_WHEN_BILL_ALREADY = "ERROR_NOT_CANCEL_BILL_WHEN_BILL_ALREADY";
    public static final String ERROR_SHIPPING_PRICE_NOT_EMPTY = "ERROR_SHIPPING_PRICE_NOT_EMPTY";
    public static final String ERROR_MONEY_LESS_TOTAL_BILL = "ERROR_MONEY_LESS_TOTAL_BILL";
    public static final String ERROR_SHIPPING_PRICE_LESS_10_THOUSAND = "ERROR_SHIPPING_PRICE_LESS_10_THOUSAND";

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
    public static final String TOPIC_CREATE_BILL = "CREATE_BILL_TOPIC";

//    send email
    public static final String SEND_EMAIL_TEMPLATE = "SEND_EMAIL_TEMPLATE";

    public static final String SEND_EMAIL_TEMPLATE_START_WITH_h1 =
            """
                        <!DOCTYPE html>
                            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                            <head>
                                <meta charset="utf-8"> <!-- utf-8 works for most cases -->
                                <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
                                <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
                                <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
                                <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
                                    
                                <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
                                    
                                <!-- CSS Reset : BEGIN -->
                                <style>
                                    
                                    /* What it does: Remove spaces around the email design added by some email clients. */
                                    /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
                                    html,
                            body {
                                margin: 0 auto !important;
                                padding: 0 !important;
                                height: 100% !important;
                                width: 100% !important;
                                background: #f1f1f1;
                            }
                                    
                            /* What it does: Stops email clients resizing small text. */
                            * {
                                -ms-text-size-adjust: 100%;
                                -webkit-text-size-adjust: 100%;
                            }
                                    
                            /* What it does: Centers email on Android 4.4 */
                            div[style*="margin: 16px 0"] {
                                margin: 0 !important;
                            }
                                    
                            /* What it does: Stops Outlook from adding extra spacing to tables. */
                            table,
                            td {
                                mso-table-lspace: 0pt !important;
                                mso-table-rspace: 0pt !important;
                            }
                                    
                            /* What it does: Fixes webkit padding issue. */
                            table {
                                border-spacing: 0 !important;
                                border-collapse: collapse !important;
                                table-layout: fixed !important;
                                margin: 0 auto !important;
                            }
                                    
                            /* What it does: Uses a better rendering method when resizing images in IE. */
                            img {
                                -ms-interpolation-mode:bicubic;
                            }
                                    
                            /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
                            a {
                                text-decoration: none;
                            }
                                    
                            /* What it does: A work-around for email clients meddling in triggered links. */
                            *[x-apple-data-detectors],  /* iOS */
                            .unstyle-auto-detected-links *,
                            .aBn {
                                border-bottom: 0 !important;
                                cursor: default !important;
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }
                                    
                            /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
                            .a6S {
                                display: none !important;
                                opacity: 0.01 !important;
                            }
                                    
                            /* What it does: Prevents Gmail from changing the text color in conversation threads. */
                            .im {
                                color: inherit !important;
                            }
                                    
                            /* If the above doesn't work, add a .g-img class to any image in question. */
                            img.g-img + div {
                                display: none !important;
                            }
                                    
                            /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
                            /* Create one of these media queries for each additional viewport size you'd like to fix */
                                    
                            /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
                            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                                u ~ div .email-container {
                                    min-width: 320px !important;
                                }
                            }
                            /* iPhone 6, 6S, 7, 8, and X */
                            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                                u ~ div .email-container {
                                    min-width: 375px !important;
                                }
                            }
                            /* iPhone 6+, 7+, and 8+ */
                            @media only screen and (min-device-width: 414px) {
                                u ~ div .email-container {
                                    min-width: 414px !important;
                                }
                            }
                                    
                                </style>
                                    
                                <!-- CSS Reset : END -->
                                    
                                <!-- Progressive Enhancements : BEGIN -->
                                <style>
                                    
                            	    .primary{
                            	background: #30e3ca;
                            }
                            .bg_white{
                            	background: #ffffff;
                            }
                            .bg_light{
                            	background: #fafafa;
                            }
                            .bg_black{
                            	background: #000000;
                            }
                            .bg_dark{
                            	background: rgba(0,0,0,.8);
                            }
                            .email-section{
                            	padding:2.5em;
                            }
                                    
                            /*BUTTON*/
                            .btn{
                            	padding: 10px 15px;
                            	display: inline-block;
                            }
                            .btn.btn-primary{
                            	border-radius: 5px;
                            	background: #1666a2;
                            	color: #ffffff;
                            }
                            .btn.btn-white{
                            	border-radius: 5px;
                            	background: #ffffff;
                            	color: #000000;
                            }
                            .btn.btn-white-outline{
                            	border-radius: 5px;
                            	background: transparent;
                            	border: 1px solid #fff;
                            	color: #fff;
                            }
                            .btn.btn-black-outline{
                            	border-radius: 0px;
                            	background: transparent;
                            	border: 2px solid #000;
                            	color: #000;
                            	font-weight: 700;
                            }
                                    
                            h1,h2,h3,h4,h5,h6{
                            	font-family: 'Lato', sans-serif;
                            	color: #000000;
                            	margin-top: 0;
                            	font-weight: 400;
                            }
                                    
                            body{
                            	font-family: 'Lato', sans-serif;
                            	font-weight: 400;
                            	font-size: 15px;
                            	line-height: 1.8;
                            	color: rgba(0,0,0,.4);
                            }
                                    
                            a{
                            	color: #30e3ca;
                            }
                                    
                            table{
                            }
                            /*LOGO*/
                                    
                            .logo h1{
                            	margin: 0;
                            }
                            .logo h1 a{
                            	color: #30e3ca;
                            	font-size: 24px;
                            	font-weight: 700;
                            	font-family: 'Lato', sans-serif;
                            }
                                    
                            /*HERO*/
                            .hero{
                            	position: relative;
                            	z-index: 0;
                            }
                                    
                            .hero .text{
                            	color: rgba(0,0,0,.3);
                            }
                            .hero .text h2{
                            	color: #000;
                            	font-size: 40px;
                            	margin-bottom: 0;
                            	font-weight: 400;
                            	line-height: 1.4;
                            }
                            .hero .text h3{
                            	font-size: 24px;
                            	font-weight: 300;
                            }
                            .hero .text h2 span{
                            	font-weight: 600;
                            	color: #30e3ca;
                            }
                                    
                                    
                            /*HEADING SECTION*/
                            .heading-section{
                            }
                            .heading-section h2{
                            	color: #000000;
                            	font-size: 28px;
                            	margin-top: 0;
                            	line-height: 1.4;
                            	font-weight: 400;
                            }
                            .heading-section .subheading{
                            	margin-bottom: 20px !important;
                            	display: inline-block;
                            	font-size: 13px;
                            	text-transform: uppercase;
                            	letter-spacing: 2px;
                            	color: rgba(0,0,0,.4);
                            	position: relative;
                            }
                            .heading-section .subheading::after{
                            	position: absolute;
                            	left: 0;
                            	right: 0;
                            	bottom: -10px;
                            	content: '';
                            	width: 100%;
                            	height: 2px;
                            	background: #30e3ca;
                            	margin: 0 auto;
                            }
                                    
                            .heading-section-white{
                            	color: rgba(255,255,255,.8);
                            }
                            .heading-section-white h2{
                            	font-family:\s
                            	line-height: 1;
                            	padding-bottom: 0;
                            }
                            .heading-section-white h2{
                            	color: #ffffff;
                            }
                            .heading-section-white .subheading{
                            	margin-bottom: 0;
                            	display: inline-block;
                            	font-size: 13px;
                            	text-transform: uppercase;
                            	letter-spacing: 2px;
                            	color: rgba(255,255,255,.4);
                            }
                                    
                                    
                            ul.social{
                            	padding: 0;
                            }
                            ul.social li{
                            	display: inline-block;
                            	margin-right: 10px;
                            }
                                    
                            /*FOOTER*/
                                    
                            .footer{
                            	border-top: 1px solid rgba(0,0,0,.05);
                            	color: rgba(0,0,0,.5);
                            }
                            .footer .heading{
                            	color: #000;
                            	font-size: 20px;
                            }
                            .footer ul{
                            	margin: 0;
                            	padding: 0;
                            }
                            .footer ul li{
                            	list-style: none;
                            	margin-bottom: 10px;
                            }
                            .footer ul li a{
                            	color: rgba(0,0,0,1);
                            }
                                    
                                    
                            @media screen and (max-width: 500px) {
                                    
                                    
                            }
                                    
                                    
                            </style>
                                    
                                    
                            </head>
                                    
                            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
                            	<center style="width: 100%; background-color: #f1f1f1;">
                                <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                                  &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                                </div>
                                <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                                	<!-- BEGIN BODY -->
                                  <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                                  	<tr>
                                      <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                                      	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                      		<tr>
                                      			<td class="logo" style="text-align: center;">
                            									<img
                            										alt="Logo"
                            										src="https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/logo%2Flogo_OOC.png?alt=media&token=9dec0335-3b77-4c5b-a278-b5b22b9ecbb4"
                            										width="70%"
                            									/>
                    """;
    public static String SEND_EMAIL_TEMPLATE_BODY_CENTER =
            """
                </td>
                  		</tr>
                  	</table>
                  </td>
        	      </tr><!-- end tr -->
        				 <!-- <tr>
                  <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
                    <img src="images/email.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
                  </td>
        	      </tr> -->
        	     <!-- end tr -->
        				<tr>
                  <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                    <table>
                    	<tr>
                    		<td>
                    			<div class="text" style="padding: 0 2.5em; text-align: center;">
            """;

    public static String SEND_EMAIL_TEMPLATE_END =
            """
                        <p><a href="http://localhost:3000/authen/sign-in" class="btn btn-primary" 
                        style=" border-radius: 5px;
                                background: #1666a2;
                                color: #ffffff;
                                padding: 10px 15px;
                                display: inline-block;">Đăng nhập tại đây</a></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                      </td>
                                      </tr><!-- end tr -->
                                  <!-- 1 Column Text + Button : END -->
                                  </table>
                                  <!-- <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                                    <tr>
                                      <td valign="middle" class="bg_light footer email-section">
                                        <table>
                                            <tr>
                                            <td valign="top" width="33.333%" style="padding-top: 20px;">
                                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                  <td style="text-align: left; padding-right: 10px;">
                                                    <h3 class="heading">About</h3>
                                                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td valign="top" width="33.333%" style="padding-top: 20px;">
                                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                  <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                                                    <h3 class="heading">Contact Info</h3>
                                                    <ul>
                                                                <li><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
                                                                <li><span class="text">+2 392 3929 210</span></a></li>
                                                              </ul>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                            <td valign="top" width="33.333%" style="padding-top: 20px;">
                                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                  <td style="text-align: left; padding-left: 10px;">
                                                    <h3 class="heading">Useful Links</h3>
                                                    <ul>
                                                                <li><a href="#">Home</a></li>
                                                                <li><a href="#">About</a></li>
                                                                <li><a href="#">Services</a></li>
                                                                <li><a href="#">Work</a></li>
                                                              </ul>
                                                  </td>
                                                </tr>
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr><!-- end: tr -->
                                    <!-- <tr>
                                      <td class="bg_light" style="text-align: center;">
                                        <p>No longer want to receive these email? You can <a href="#" style="color: rgba(0,0,0,.8);">Unsubscribe here</a></p>
                                      </td>
                                    </tr> -->
                                  </table>
                                    
                                </div>
                              </center>
                            </body>
                            </html>
                    """;

}
