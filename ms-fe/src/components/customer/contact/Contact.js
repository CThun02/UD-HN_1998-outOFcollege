import React from 'react';
import styles from './Contact.module.css'
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Collapse, Row } from 'antd';

const items = [
  {
    key: '1',
    label: 'OOC - WEBSITE MUA SẮM THỜI TRANG HÀNG HIỆU TRỰC TUYẾN VIỆT NAM!',
    children: <p>OOC sẽ mang lại cho khách hàng những trải nghiệm mua sắm thời trang hàng hiệu trực tuyến thú vị từ các thương hiệu thời trang quốc tế và trong nước, cam kết chất lượng phục vụ hàng đầu cùng với những bộ sưu tập quần áo nam nữ khổng lồ từ trang phục, phụ kiện cho phụ nữ với những xu hướng thời trang mới nhất. Bạn có thể tìm thấy những bộ trang phục mình muốn từ những bộ đồ ở nhà thật thoải mái hay tự tin trong những bộ trang phục công sở phù hợp. Những trải nghiệm mới chỉ có ở trang mua sắm hàng hiệu trực tuyến OOC.</p>,
  },
  {
    key: '2',
    label: 'OOC - MÓN QUÀ TẶNG NGƯỜI THÂN THẬT Ý NGHĨA!',
    children: <p>OOC sẽ gợi ý cho bạn những món quà thật ý nghĩa để tặng người thân, bạn bè. Chúng tôi sẽ làm bạn hài lòng với sự lựa chọn của mình bằng giá tốt nhất và chất lượng dịch vụ hoàn hảo của OOC.</p>,
  },
  {
    key: '3',
    label: 'MUA SẮM Ở OOC - PHÙ HỢP VỚI TÚI TIỀN TỪ DOANH NHÂN, NHÂN VIÊN VĂN PHÒNG ĐẾN CÁC BẠN TRẺ',
    children: <p>Đặc biệt, OOC còn có nhiều đợt khuyến mãi, giảm giá đặc biệt với giá tốt nhất. Thời trang hàng hiệu chất lượng cao, phù hợp túi tiền - chỉ có ở OOC!</p>,
  },]

const items2 = [
  {
    key: '1',
    label: 'MUA SẮM Ở OOC - PHÙ HỢP VỚI TÚI TIỀN TỪ DOANH NHÂN, NHÂN VIÊN VĂN PHÒNG ĐẾN CÁC BẠN TRẺ',
    children: <p >OOC luôn cập nhật những xu hướng thời trang phong cách nhất đều có ở OOC.</p >,
  },
  {
    key: '2',
    label: 'OOC - WEBSITE MUA SẮM THỜI TRANG HÀNG HIỆU TRỰC TUYẾN HÀNG ĐẦU VIỆT NAM',
    children: <p>OOC sẽ mang lại cho khách hàng những trải nghiệm mua sắm thời trang hàng hiệu trực tuyến thú vị từ các thương hiệu thời trang quốc tế và trong nước, cam kết chất lượng phục vụ hàng đầu cùng với những bộ sưu tập quần áo nam nữ khổng lồ từ trang phục, phụ kiện cho phụ nữ với những xu hướng thời trang mới nhất. Bạn có thể tìm thấy những bộ trang phục mình muốn từ những bộ đồ ở nhà thật thoải mái hay tự tin trong những bộ trang phục công sở phù hợp. Những trải nghiệm mới chỉ có ở trang mua sắm hàng hiệu trực tuyến OOC.</p>,
  },
  {
    key: '3',
    label: 'OOC - MÓN QUÀ TẶNG NGƯỜI THÂN THẬT Ý NGHĨA!',
    children: <p>OOC sẽ gợi ý cho bạn những món quà thật ý nghĩa để tặng người thân, bạn bè. Chúng tôi sẽ làm bạn hài lòng với sự lựa chọn của mình bằng giá tốt nhất và chất lượng dịch vụ hoàn hảo của OOC.</p>,
  },]

const Conteact = () => {
  return (
    <div style={{ backgroundColor: '#ffffff', fontSize: '18px', color: '#111111' }}>
      <div style={{
        backgroundColor: '#f8f6f3', height: '340px', marginTop: '-100px',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '52px', fontWeight: '700', marginTop: '50px' }}>
          LIÊN HỆ
        </h1>
      </div>
      <div className={styles.boxContent}>
        <div className={styles.boxContentChild}>
          <span><PhoneOutlined style={{ fontSize: '30px', color: 'green', marginBottom: '10px' }} /></span>
          <span>+65 11.188.888</span>
        </div>
        <div className={styles.boxContentChild} style={{ margin: '0 40px' }}>
          <MailOutlined style={{ fontSize: '30px', color: 'green', marginBottom: '10px' }} />
          <span>menshirts.shop.outofcollege@gmail.com</span>
        </div>
        <div className={styles.boxContentChild}>
          <EnvironmentOutlined style={{ fontSize: '30px', color: 'green', marginBottom: '10px' }} />
          13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
        </div>
      </div>
      <div style={{ minHeight: '500px', marginTop: '100px ', height: 'auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Câu hỏi thường gặp</h1>
        <Row style={{ paddingLeft: '300px' }}>
          <Col span={10}>
            <Collapse expandIconPosition="right" ghost items={items} style={{ fontSize: '20px', marginRight: '50px' }} />
          </Col>
          <Col span={10}>
            <Collapse expandIconPosition="right" ghost items={items2} style={{ fontSize: '20px', marginLeft: '50px' }} />
          </Col>
        </Row>
      </div>
    </div >
  )
}

export default Conteact
