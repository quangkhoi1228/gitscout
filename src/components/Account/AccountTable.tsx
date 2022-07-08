import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import { EditOutlined } from '@ant-design/icons';
import NoWrap from 'components/Template/NoWrap';
import { formatNumber } from 'utils/utils';

interface DataType {
  name: string;
  walletAddress: string;
  email: string;
  totalProject: number;
  totalInvestValue: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Họ tên',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <NoWrap>{text}</NoWrap>,
  },
  {
    title: 'Địa chỉ ví',
    dataIndex: 'walletAddress',
    key: 'walletAddress',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <NoWrap>{formatNumber(text)}</NoWrap>,
  },

  {
    title: '#Dự án',
    dataIndex: 'totalProject',
    key: 'totalProject',
    render: (text) => <NoWrap>{formatNumber(text)}</NoWrap>,
  },
  {
    title: 'Tổng đầu tư',
    dataIndex: 'totalInvestValue',
    key: 'totalInvestValue',
    render: (text) => <NoWrap>{formatNumber(text)}</NoWrap>,
  },

  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        {/* <Link to={'/updateprojectprogress'}> */}
        <Button icon={<EditOutlined />} />
        {/* </Link> */}
      </Space>
    ),
  },
];

function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const AccountTable = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);

  useEffect(() => {
    const data: DataType[] = Array.from(Array(5).keys()).map((item) => {
      const value = item + 1;
      return {
        key: `${value}`,
        name: `Khách hàng ${value}`,
        walletAddress: `0x${getRandomNumberBetween(
          10000000000000000000,
          100000000000000000000
        )}`,
        email: `user${value}@gmail.com`,
        totalProject: getRandomNumberBetween(1, 10),
        totalInvestValue: getRandomNumberBetween(100000000000, 999000000000),
      };
    });

    setTableData(data);
  }, []);

  return (
    <div className='box'>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          defaultCurrent: 1,
          total: 10,
        }}
      />
    </div>
  );
};

export default AccountTable;
