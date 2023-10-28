import { Col, Row } from 'antd'
import React from 'react'
import styles from './About.module.css'

const About = () => {
    return (
        <section>
            <div style={{
                backgroundColor: '#f3f5f5', height: '340px', marginTop: '-100px',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <h1 style={{ textAlign: 'center', fontSize: '52px', fontWeight: '700', marginTop: '50px' }}>
                    About Us
                </h1>
            </div>
            <div >
                <Row style={{ margin: '100px 200px' }}>
                    <Col span={10} style={{ fontSize: '18px', marginTop: '30px' }}>
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
                        <img className={styles.img} decoding="async" fetchpriority="high" width="600" height="550" src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01.jpg" class="attachment-large size-large wp-image-3007" alt="" srcset="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01.jpg 800w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-300x206.jpg 300w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-768x528.jpg 768w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-600x413.jpg 600w, https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2020/01/banner-01-400x275.jpg 400w" sizes="(max-width: 800px) 100vw, 800px" />
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default About
