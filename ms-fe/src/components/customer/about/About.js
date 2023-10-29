import { Button, Col, Row } from 'antd'
import React from 'react'
import styles from './About.module.css'
import {
    DownCircleOutlined
} from "@ant-design/icons";
import { ShoppingCartOutlined } from '@ant-design/icons';
const logo = "/logo/logo-shop.png";

const About = () => {
    return (
        <section style={{ color: 'black' }}>
            <div style={{
                backgroundColor: '#f8f6f3', height: '340px', marginTop: '-100px',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <h1 style={{ textAlign: 'center', fontSize: '52px', fontWeight: '700', marginTop: '50px' }}>
                    About Us
                </h1>
            </div>

            <section >
                <Row style={{ margin: '100px 200px' }}>
                    <Col span={10} style={{ fontSize: '18px', marginTop: '40px' }}>
                        <h2>We Are Your Favourite Store.</h2>
                        <br />
                        <p>
                            Tuas quisquam quo gravida proident harum, aptent ligula anim consequuntur, ultrices mauris, nunc voluptates lobortis, varius, potenti placeat! Fuga omnis. Cubilia congue. Recusandae. Vero penatibus quasi! Nostra tenetur dignissimos ultrices natus distinctio ultrices consequuntur numqu.
                        </p>
                        <br />
                        <p>
                            Officiis fuga harum porro et? Similique rhoncus atque! Netus blanditiis provident nunc posuere. Rem sequi, commodo, lorem tellus elit, hic sem tenetur anim amet quas, malesuada proident platea corrupti expedita.
                        </p>
                    </Col>
                    <Col span={10} style={{ marginLeft: '50px' }}>
                        <img className={styles.img} decoding="async" fetchpriority="high" width="600" height="450" src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01.jpg" class="attachment-large size-large wp-image-3007" alt="" srcset="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01.jpg 800w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-300x206.jpg 300w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-768x528.jpg 768w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-600x413.jpg 600w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-400x275.jpg 400w" sizes="(max-width: 800px) 100vw, 800px" />
                    </Col>
                </Row>
            </section>

            <section style={{ backgroundColor: '#001524', height: '160px', color: '#ffffff' }}>
                <Row style={{ padding: '30px 50px' }}>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '30px' }}>
                        Numbers Speak For Themselves!
                    </Col>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '20px' }}>
                        <span style={{ fontSize: '40px' }}>5,000+</span>
                        <br />
                        Curated Products
                    </Col>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '20px' }}>
                        <span style={{ fontSize: '40px' }}>800+</span>
                        <br />
                        Curated Products
                    </Col>
                    <Col span={6} style={{ textAlign: 'center', fontSize: '20px' }}>
                        <span style={{ fontSize: '40px' }}>40+</span>
                        <br />
                        Product Categories
                    </Col>
                </Row>
            </section>

            <div style={{ marginTop: '200px', display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
                <Row style={{ width: '1200px' }} >
                    <Col span={12}>
                        <div style={{ backgroundColor: '#f8f6f3', height: '600px', width: '600px', borderRadius: '5px', position: 'relative' }}>
                            <img className={styles.img} src='/category/category-1.png' alt='ahihi' />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ marginLeft: '100px', marginTop: '50px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', fontSize: '16px' }}>
                                <img src={logo} alt="logo-shop" style={{ height: '70px' }} />
                                <div style={{ flex: '1', marginLeft: '10px' }}>
                                    <h3 style={{ marginBottom: '10px' }}>Certified Products</h3>
                                    <p>Click edit button to change this text. Lorem ipsum dolor sit amet</p>
                                </div>
                            </div>
                            <h1 style={{ fontSize: '35px', margin: '20px 0' }}>We Deal With Various Quality Organic Products!</h1>
                            <Row>
                                <Col span={12} style={{ fontSize: '18px' }}>
                                    <ul style={{ listStyleType: 'none' }}>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Fresh fruits</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Dry fruits</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Dried vegetables</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Dried vegetables</li>
                                    </ul>
                                </Col>
                                <Col span={12} style={{ fontSize: '18px' }}>
                                    <ul style={{ listStyleType: 'none' }}>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Fresh fruits</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Dry fruits</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Dried vegetables</li>
                                        <li><DownCircleOutlined style={{ color: 'blue' }} /> Dried vegetables</li>
                                    </ul>
                                </Col>
                            </Row>
                            <Button className={styles.btn} type='primary'><ShoppingCartOutlined />START SHOPPING</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </section >
    )
}

export default About
