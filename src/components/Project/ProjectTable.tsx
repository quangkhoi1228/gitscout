import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { EditOutlined } from '@ant-design/icons';
import NoWrap from 'components/Template/NoWrap';
import {
  TableBuilder,
  TableBuilderProps,
} from 'components/Template/TableBuilder';
import { Link } from 'react-router-dom';
import ProjectDataType from 'types/ProjectDataType';
import { formatNumber } from 'utils/utils';

const columns: ColumnsType<ProjectDataType> = [
  {
    title: 'Tên dự án',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
    render: (text) => <NoWrap>{text}</NoWrap>,
  },
  {
    title: 'Số hiệu',
    dataIndex: 'code',
    key: 'code',
    sorter: true,
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Giá trị',
    dataIndex: 'expectValue',
    key: 'expectValue',
    render: (text) => <NoWrap>{formatNumber(text)}</NoWrap>,
  },

  {
    title: 'Số cổ phần',
    dataIndex: 'shares',
    key: 'shares',
    render: (text) => <NoWrap>{formatNumber(text)}</NoWrap>,
  },
  {
    title: 'Đã huy động',
    dataIndex: 'shares',
    key: 'shares',
    render: (text) => <NoWrap>{formatNumber(text)}</NoWrap>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => {
      return (
        <Space size='middle'>
          <Link to={`/updateprojectprogress?code=${record.code}`}>
            <Button icon={<EditOutlined />} />
          </Link>
        </Space>
      );
    },
  },
];

const ProjectTable = (props: TableBuilderProps) => {
  return (
    <div className='box has-border'>
      <TableBuilder {...{ ...props, columns }} />
    </div>
  );
};

export default ProjectTable;
