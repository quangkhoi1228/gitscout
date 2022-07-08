import { Row, Col, Space } from 'antd';
import React from 'react';
import { formatNumber } from 'utils/utils';

const OverviewInfo = () => {
  return (
    <section className='section'>
      <h2>Thông tin chung</h2>
      <div className='overview-container box'>
        <Row gutter={[16, 16]}>
          <Col xl={12} xs={24}>
            <Space
              direction='vertical'
              size='middle'
              style={{ display: 'flex' }}
            >
              <div className='info-container'>
                <span className='label'>Dự án đang chạy: </span>
                <span className='value'>30/50</span>
              </div>

              <div className='info-container'>
                <span className='label'>Số vốn huy động: </span>
                <span className='value'>{formatNumber(1000)} USDT</span>
              </div>

              <div className='info-container'>
                <span className='label'>Số lợi nhuận phân phối: </span>
                <span className='value'>{formatNumber(500)} USDT</span>
              </div>
            </Space>
          </Col>

          <Col xl={12} xs={24}>
            <Space
              direction='vertical'
              size='middle'
              style={{ display: 'flex' }}
            >
              <div className='info-container'>
                <span className='label'>Số lượng người dùng: </span>
                <span className='value'>{formatNumber(1000)}</span>
              </div>
              <div className='info-container'>
                <span className='label'>Số nhà đầu tư: </span>
                <span className='value'>{formatNumber(500)}</span>
              </div>
              <div className='info-container'>
                <span className='label'>Hoa hồng: </span>
                <span className='value'>{formatNumber(100)} USDT</span>
              </div>
            </Space>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default OverviewInfo;
