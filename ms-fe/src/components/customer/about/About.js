import { Button, Col, Row } from 'antd'
import React from 'react'
import styles from './About.module.css'
import {
    DownCircleOutlined
} from "@ant-design/icons";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
const logo = "/logo/logo-shop.png";

const About = () => {
    return (
        <section style={{ color: 'black' }}>
            <div style={{
                backgroundColor: '#f8f6f3', height: '340px', marginTop: '-100px',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <h1 style={{ textAlign: 'center', fontSize: '52px', fontWeight: '700', marginTop: '50px' }}>
                    GIỚI THIỆU
                </h1>
            </div>

            <section >
                <Row style={{ margin: '100px 200px' }}>
                    <Col span={10} style={{ fontSize: '18px', marginTop: '40px' }}>
                        <h2>OOC - WEBSITE MUA SẮM THỜI TRANG HÀNG HIỆU TRỰC TUYẾN HÀNG ĐẦU VIỆT NAM</h2>
                        <br />
                        <p>
                            OOC sẽ mang lại cho khách hàng những trải nghiệm mua sắm thời trang hàng hiệu trực tuyến thú vị từ các thương hiệu thời trang quốc tế và trong nước, cam kết chất lượng phục vụ hàng đầu cùng với những bộ sưu tập áo sơ mi nam khổng lồ từ trang phục với những xu hướng thời trang mới nhất. Bạn có thể tìm thấy những bộ trang phục mình muốn từ những bộ đồ ở nhà thật thoải mái hay tự tin trong những bộ trang phục công sở phù hợp. Những trải nghiệm mới chỉ có ở trang mua sắm hàng hiệu trực tuyến OOC.
                        </p>
                    </Col>
                    <Col span={10} style={{ marginLeft: '50px' }}>
                        <img style={{ width: 600, height: 450 }} src="/category/category-1.png" alt="" sizes="(max-width: 800px) 100vw, 800px" />
                    </Col>
                </Row>
            </section>

            <section style={{ backgroundColor: '#001524', height: '160px', color: '#ffffff' }}>
                <Row style={{ padding: '30px 50px' }}>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '30px' }}>
                        Numbers Speak For Themselves!
                    </Col>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '20px' }}>
                        <span style={{ fontSize: '40px', fontWeight: '500' }}>5,000+</span>
                        <br />
                        Curated Products
                    </Col>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '20px' }}>
                        <span style={{ fontSize: '40px', fontWeight: '500' }}>800+</span>
                        <br />
                        Curated Products
                    </Col>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '20px' }}>
                        <span style={{ fontSize: '40px', fontWeight: '500' }}>40+</span>
                        <br />
                        Product Categories
                    </Col>
                </Row>
            </section>

            <div style={{ marginTop: '200px', marginBottom: '100px', display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
                <Row style={{ width: '1200px' }} >
                    <Col span={12}>
                        <div className={styles.infoLeftImg}>
                            <div>
                                <img className={styles.img} src='/category/category-1.png' alt='ahihi' />
                            </div>
                        </div>
                        <div className={styles.iconStar}>
                            <FontAwesomeIcon icon={faStar} style={{ color: '#ffbb1e' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: '#ffbb1e' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: '#ffbb1e' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: '#ffbb1e' }} />
                            <FontAwesomeIcon icon={faStar} style={{ color: '#ffbb1e' }} />
                        </div>
                        <div className={styles.infoLeftP}>
                            <p style={{ textAlign: 'center' }}>
                                Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                            </p>
                        </div>
                        <div className={styles.endLeft}>
                            <div style={{ borderRadius: '50%', height: '55px', width: '55px', }}>
                                <img decoding="async" width="60" height="60" src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/client02-free-img.png" className="attachment-full size-full wp-image-2515" alt="" srcSet="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/client02-free-img.png 60w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/client02-free-img-17x17.png 17w" sizes="(max-width: 60px) 100vw, 60px" />
                            </div>
                            <p style={{ marginLeft: '20px' }}>Mila Kunit</p>

                        </div>

                    </Col>
                    <Col span={12}>
                        <div style={{ marginLeft: '100px', marginTop: '50px' }}>
                            <div className={styles.titleRight}>
                                <img src={logo} alt="logo-shop" style={{ height: '70px' }} />
                                <div style={{ flex: '1', marginLeft: '10px' }}>
                                    <h3 style={{ marginBottom: '10px' }}>Sản phẩm đã được chứng nhận</h3>
                                    <p>Sự đơn giản là định nghĩa của thanh lịch.</p>
                                </div>
                            </div>
                            <h1 style={{ fontSize: '35px', margin: '20px 0' }}>Chúng bán những sản phẩm chất lượng!</h1>
                            <Row>
                                <Col span={12} style={{ fontSize: '18px' }}>
                                    <ul  >
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Thanh lịch</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Trẻ trung</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Lịch sự</li>

                                    </ul>
                                </Col>
                                <Col span={12} style={{ fontSize: '18px' }}>
                                    <ul  >
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Chuyên nghiệp</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Hiện đại</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Truyền thống</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Button className={styles.btn} type='primary'><ShoppingCartOutlined />
                                Bắt đâu mua hàng
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </section >
    )
}

export default About
