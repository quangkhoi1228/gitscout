import { ColumnsType } from 'antd/lib/table';

import NoWrap from 'components/Template/NoWrap';

import {
  TableBuilder,
  TableBuilderProps,
  TableBuilderViewDetailRecord
} from 'components/Template/TableBuilder';
import ConfigDataType from 'types/ConfigDataType';

const ConfigTable = (props: TableBuilderProps) => {
  const columns: ColumnsType<ConfigDataType> = [
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <TableBuilderViewDetailRecord props={props} record={record} />
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',

      render: (text) => <NoWrap>{text}</NoWrap>,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <NoWrap>{text}</NoWrap>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text,
    },
  ];

  return <TableBuilder {...{ ...props, columns }} />;
};

export default ConfigTable;
