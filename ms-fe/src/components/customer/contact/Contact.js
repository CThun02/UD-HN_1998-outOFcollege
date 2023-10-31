import React from 'react';
import styles from './Contact.module.css'
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Collapse, Row } from 'antd';

const items = [
  {
    key: '1',
    label: 'Pulvinar nostrud class cum facilis?',
    children: <p>I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo.</p>,
  },
  {
    key: '2',
    label: 'Pon excepturi numquam, facilis?',
    children: <p>I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, adipiscing elit. Ut elit tellus, luctus nec mattis, pulvinar dapibus leo.</p>,
  },
  {
    key: '3',
    label: 'Pon excepturi numquam, facilis?',
    children: <p>I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, adipiscing elit. Ut elit tellus, luctus nec mattis, pulvinar dapibus leo.</p>,
  },]

const Conteact = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', fontSize: '18px' }}>
      <div style={{
        backgroundColor: '#f8f6f3', height: '340px', marginTop: '-100px',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '52px', fontWeight: '700', marginTop: '50px' }}>
          Get In Touch
        </h1>
      </div>
      <div className={styles.boxContent}>
        <div className={styles.boxContentChild}>
          <span><PhoneOutlined style={{ fontSize: '30px', color: 'green', marginBottom: '10px' }} /></span>
          <span>+123 456 7890</span>
          <span>+123 456 7890</span>
        </div>
        <div className={styles.boxContentChild} style={{ margin: '0 40px' }}>
          <MailOutlined style={{ fontSize: '30px', color: 'green', marginBottom: '10px' }} />
          <span>info@example.com</span>
          <span> support@example.com</span>
        </div>
        <div className={styles.boxContentChild}>
          <EnvironmentOutlined style={{ fontSize: '30px', color: 'green', marginBottom: '10px' }} />
          1569 Ave, New York,
          NY 10028, USA
        </div>
      </div>
      <div style={{ minHeight: '500px', marginTop: '100px ', height: 'auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Frequently Asked Question!</h1>
        <Row style={{ paddingLeft: '300px' }}>
          <Col span={10}>
            <Collapse expandIconPosition="right" ghost items={items} style={{ fontSize: '20px', marginRight: '50px' }} />
          </Col>
          <Col span={10}>
            <Collapse expandIconPosition="right" ghost items={items} style={{ fontSize: '20px', marginLeft: '50px' }} />
          </Col>
        </Row>
      </div>
    </div >
  )
}

export default Conteact
