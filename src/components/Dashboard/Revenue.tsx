import { Row, Col, Select } from 'antd';
import React from 'react';
import Chart from './Chart';
const { Option } = Select;

const Revenue = () => {
  const d = new Date();
  let month = d.getMonth() + 1;
  return (
    <section className='section'>
      <Row>
        <Col>
          <h2>Doanh số</h2>
        </Col>
        <Col>
          <Select
            size='large'
            defaultValue={'Tháng ' + month.toString()}
            style={{ width: 120, marginLeft: '1rem' }}
            onChange={handleChange}
          >
            {Array.from(Array(12).keys()).map((item) => {
              const value = item + 1;

              return (
                <Option value={value} key={value}>
                  Tháng {value}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>

      <Chart />
    </section>
  );
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export default Revenue;
