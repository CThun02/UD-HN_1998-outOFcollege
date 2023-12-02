import React, { useEffect, useState } from "react";
import logoOOC from "../../../Assets/img/logo/logo_OOC.svg";

const MailDesign = ({ title, infor, link, message, buttonName, products }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    function getTotalPrice() {
        var total = 0;
        for (let index = 0; index < products.length; index++) {
            total += products[index].price * products[index].quantity;
        }
        setTotalPrice(total);
    }
    useEffect(() => {
        getTotalPrice();
    }, [totalPrice]);

    return (
        <div
            style={{
                backgroundColor: "#fff",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <div style={{ width: "480px", margin: "72px 0" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <img alt="" src={logoOOC} style={{ width: "30%" }} />
                        <span>{infor}</span>
                    </div>
                    <div style={{ marginTop: "24px" }}>
                        <span
                            style={{
                                fontWeight: "500",
                                fontSize: "24px",
                            }}
                        >
                            {title}
                        </span>
                        <br />
                        <br />
                        <p style={{ textAlign: "justify" }}>{message}</p>
                        <br />
                        <div>
                            <a
                                style={{
                                    color: "white",
                                    fontWeight: "500",
                                    padding: "16px 20px",
                                    borderRadius: "4px",
                                    backgroundColor: "#1666a2",
                                    marginRight: "20px",
                                }}
                                href={link}
                            >
                                {buttonName}
                            </a>
                            hoặc{" "}
                            <a style={{ marginLeft: "20px" }} href="http://localhost:3000/">
                                Đến cửa hàng của chúng tôi
                            </a>
                        </div>
                        <br />
                        <hr />
                        <br />
                        {products && (
                            <>
                                <span>Thông tin đơn hàng</span>
                                <div style={{ marginTop: "8px" }}>
                                    {products.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div style={{ width: "20%", padding: "4px" }}>
                                                    <img
                                                        alt="product"
                                                        style={{
                                                            width: "100%",
                                                            border: "1px solid #ccc",
                                                            borderRadius: "8px",
                                                        }}
                                                        src={item.img}
                                                    />
                                                </div>
                                                <div style={{ width: "55", padding: "4px" }}>
                                                    <p>
                                                        {item.name}{" "}
                                                        <span style={{ fontWeight: "500" }}>
                                                            x {item.quantity}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div style={{ width: "25%", padding: "4px" }}>
                                                    <p>
                                                        {(item.price * item.quantity).toLocaleString(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <hr />
                                    <div
                                        style={{ width: "70%", float: "right", marginTop: "10px" }}
                                    >
                                        <div
                                            style={{
                                                width: "70%",
                                                display: "inline-block",
                                                marginBottom: "12px",
                                            }}
                                        >
                                            <span>Tổng giá trị sản phẩm: </span>
                                        </div>
                                        <div style={{ width: "30%", display: "inline-block" }}>
                                            <span style={{ fontWeight: "500" }}>
                                                {totalPrice.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                width: "70%",
                                                display: "inline-block",
                                                marginBottom: "12px",
                                            }}
                                        >
                                            <span>Khuyến mại: </span>
                                        </div>
                                        <div style={{ width: "30%", display: "inline-block" }}>
                                            <span style={{ fontWeight: "500" }}>
                                                {(0).toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                width: "70%",
                                                display: "inline-block",
                                                marginBottom: "12px",
                                            }}
                                        >
                                            <span>Phí vận chuyển: </span>
                                        </div>
                                        <div style={{ width: "30%", display: "inline-block" }}>
                                            <span style={{ fontWeight: "500" }}>
                                                {(0).toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </span>
                                        </div>
                                        <hr />
                                        <div
                                            style={{
                                                width: "50%",
                                                display: "inline-block",
                                                marginBottom: "12px",
                                            }}
                                        >
                                            <span>Tổng cộng: </span>
                                        </div>
                                        <div
                                            style={{
                                                width: "50%",
                                                display: "inline-block",
                                                textAlign: "end",
                                            }}
                                        >
                                            <span style={{ fontWeight: "500", fontSize: "24px" }}>
                                                {totalPrice.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MailDesign;
