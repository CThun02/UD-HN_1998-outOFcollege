import { Badge, Button, Carousel, Col, Input, Modal, Row, notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from "../../admin/product/ProductDetails.module.css";
import { CheckOutlined } from '@ant-design/icons';

const EditProductCart = ({productDetailId, billDetailId, onCancel, open, render, quantityBuy, setLoadingButtonTimeline, renderTimeline}) => {
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colorSelect, setColorSelect] = useState("");
    const [sizeSelect, setSizeSelect] = useState("");
    const [quantity, setQuantity] = useState(quantityBuy);
    const [productDetail, setProductDetail] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState("");
    const [price, setPrice] = useState(0);
    const [loadingButton, setLoadingButton] = useState(false);
    const [renderThis, setRenderThis] = useState(null);

    function handleChangeQuantity(quantity, record) {

        setQuantity(quantity)
        if(quantity<=0 ){
          setError("Số lượng mua lớn hơn phải lớn hơn 0")
        }else if( quantity - quantityBuy> record.quantity){
          setError("Số lượng tồn không đủ")
        }else if(quantity * price > 5000000){
          setError("Vui lòng liên hệ cửa hàng để mua nhiều sản phẩm  có giá trị lớn hơn 5.000.000đ")
        }else{
          setError("")
        }
      }

    const updateBill = ()=>{
        setLoadingButton(true);
        setLoadingButtonTimeline(true)
        axios.put("http://localhost:8080/api/client/updateBill/"+billDetailId, {
          id: productDetail?.id,
          quantity:quantity,
          price: price,
        }).then(res=>{
          notification.success({message:"Thông báo", description:"Chỉnh sửa hóa đơn thành công thành công!"})
          render(Math.random)
          setLoadingButton(false)
          setLoadingButtonTimeline(false);
          setRenderThis(Math.random)
        }).catch((error)=>{
            notification.error({
              message:"Thông báo",
              description:error?.response?.data?.message,
            })
            setLoadingButton(false)
            setLoadingButtonTimeline(false);
        })
      }

    useEffect(() => {
      axios.get("http://localhost:8080/api/client/getSizeProductDetailEdit?id="+productDetailId+"&colorId="+colorSelect)
      .then(res=>{
        setSizes(res?.data)
        let check = res?.data.some(item => item.id===sizeSelect);
        if(!check){
            setSizeSelect(res?.data[0].id)
        }
      }).catch(err=>{
        console.log(err)
      })
      axios.get("http://localhost:8080/api/client/getColorProductDetailEdit?id="+productDetailId+"&sizeId="+sizeSelect)
      .then(res=>{
        setColors(res?.data)
        let check = res?.data.some(item => item.id===colorSelect);
        if(!check){
            setColorSelect(res?.data[0].id)
        }
      }).catch(err=>{
        console.log(err)
      })
      if(colorSelect && sizeSelect){
        axios.get("http://localhost:8080/api/client/getProductDetailEdit?id="+productDetailId+"&colorId="+colorSelect+"&sizeId="+sizeSelect)
        .then(res=>{
            setProductDetail(res.data)
            setIsLoad(true);
            if(!isLoad){
                setColorSelect(res.data.color.id)
                setSizeSelect(res.data.size.id)
                setPrice(res.data?.promotion.length !== 0
                ? res.data?.promotion[0].promotionMethod === "%"
                  ? (
                      (res.data?.price *
                        (100 - Number(res.data?.promotion[0].promotionValue))) /
                      100
                    )
                  : (
                      res.data?.price - Number(res.data?.promotion[0].promotionValue)
                    )
                : res.data?.price)
            }
        }).catch(err=>{
            console.log(err)
        })
      }
        
    }, [sizeSelect, colorSelect, renderThis, renderTimeline])
    
  return (
    <Modal 
        open={open}
        onCancel={onCancel}
        footer={null}
        title={"Chỉnh sửa sản phẩm"}
        centered
    >
        <Row>
              <Col span={8}>
                <div
                  style={{
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                >
                  {productDetail && productDetail?.promotion?.length !== 0 ? (
                    <Badge.Ribbon
                      text={`Giảm ${
                        productDetail?.promotion[0].promotionValue
                          ? productDetail?.promotion[0].promotionMethod === "%"
                            ? productDetail?.promotion[0].promotionValue +
                              " " +
                              productDetail?.promotion[0].promotionMethod
                            : productDetail?.promotion[0].promotionValue.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )
                          : null
                      }`}
                      color="red"
                    >
                      <Carousel style={{ maxWidth: "300px" }} autoplay>
                        {productDetail?.productImageResponse &&
                          productDetail?.productImageResponse.map((item) => {
                            return (
                              <img
                                key={item.id}
                                style={{ width: "100%", marginTop: "10px" }}
                                alt=""
                                src={item.path}
                              />
                            );
                          })}
                      </Carousel>
                    </Badge.Ribbon>
                  ) : (
                    <Carousel style={{ maxWidth: "300px" }} autoplay>
                      {productDetail?.productImageResponse &&
                        productDetail?.productImageResponse.map((item) => {
                          return (
                            <img
                              key={item.id}
                              style={{ width: "100%", marginTop: "10px" }}
                              alt=""
                              src={item.path}
                            />
                          );
                        })}
                    </Carousel>
                  )}
                </div>
              </Col>
              <Col span={16}>
              <div
                className="m-5"
                style={{
                  textAlign: "start",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {productDetail?.product?.productName +
                    "-" +
                    productDetail?.brand?.brandName +
                    "-" +
                    productDetail?.category?.categoryName +
                    "-" +
                    productDetail?.button?.buttonName +
                    "-" +
                    productDetail?.material?.materialName +
                    "-" +
                    productDetail?.collar?.collarTypeName +
                    "-" +
                    productDetail?.sleeve?.sleeveName +
                    "-" +
                    productDetail?.shirtTail?.shirtTailTypeName +
                    "-" +
                    productDetail?.pattern?.patternName +
                    "-" +
                    productDetail?.form?.formName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: productDetail?.color.colorCode,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {productDetail?.color.colorName}
                </div>
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {productDetail?.size.sizeName}
                </span>
                <br/>
                <b>Số lượng tồn: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {productDetail?.quantity}
                </span>
                <br/>
                <b>Số lượng mua: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {quantityBuy}
                </span>
                <br/>
                <b>Đơn giá: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                    })}
                </span>
                <br/>
                <b>Thành tiền: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {(price*quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                </span>
              </div>
              </Col>
              <Col span={24} style={{display:"flex", alignItems:"center"}}>
                <b>Màu sắc: </b> <br/>
                {colors && colors.map(item=>{
                    return(
                        <div
                            className={`${colorSelect===item.id?styles.colorSelect:""} ${styles.colorSelectHover}`}
                            onClick={()=>setColorSelect(item.id)}
                            style={{
                                backgroundColor:item?.componentCode,
                                marginLeft: "8px",
                                width:"40px",
                                height:"40px",
                                borderRadius:"50%",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                            }}
                        >
                            {colorSelect===item.id?<CheckOutlined />:""}
                        </div>
                    )
                })}
              </Col>
              <Col span={24} style={{display:"flex", alignItems:"center", marginTop:"20px"}}>
                <b>Kích cỡ: </b><br/>
                {sizes && sizes.map(item=>{
                    return(
                        <div
                            className={`${sizeSelect===item.id?styles.sizeSelect:""} ${styles.sizeSelectHover}`}
                            onClick={()=>setSizeSelect(item.id)}
                            style={{
                                marginLeft: "8px",
                                width:"40px",
                                height:"30px",
                                display:"flex",
                                border:"1px solid black",
                                borderRadius:"4px",
                                alignItems:"center",
                                justifyContent:"center",
                            }}
                        >
                            {item.componentName}
                        </div>
                    )
                })}
              </Col>
              <Col span={24}>
                <b>Số lượng mua </b><br/>
                <Input
                    type={"number"}
                    value={quantity}
                    onChange={(event) => handleChangeQuantity(event.target.value, productDetail)}
                    onBlur={(event)=>{
                        if(error!==""){
                        setQuantity(1);
                        }else{
                        setQuantity(event.target.value)
                        }
                        setError("")
                    }
                    }
                    />
                    <span style={{color:"red"}}>{error}</span>
                    <div style={{marginTop:"12px", textAlign:"center"}}>
                    <Button
                        type="primary"
                        size="large"
                        disabled={error !== ""}
                        onClick={() => {updateBill()}}
                        loading={loadingButton}
                    >
                        Xác nhận
                    </Button>
                    </div>
              </Col>
            </Row>
    </Modal>
  )
}

export default EditProductCart