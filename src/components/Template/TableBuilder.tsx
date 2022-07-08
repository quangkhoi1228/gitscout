import { Button, Space, Table, TablePaginationConfig, Tooltip } from 'antd';

import { EditOutlined } from '@ant-design/icons';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
} from 'antd/lib/table/interface';
import { useEffect, useState } from 'react';
import DataPagination, { DataPaginationEmpty } from 'types/DataPagination';
import Json from 'types/Json';

export interface TableBuilderProps {
  data: DataPagination;
  paginationHandle: {
    pagination: TablePaginationConfig;
    setPagination: Function;
  };
  sortHandle?: {
    sort: Json;
    setSort: Function;
  };
  filtersHandle?: {
    filters: Json;
    setFilters: Function;
  };

  loadingHandle: { loading: boolean; setLoading: Function };
  columns?: ColumnsType<any>;
  onViewDetailRecord?: Function;
}

const TableBuilder = ({
  data,
  paginationHandle,
  sortHandle,
  loadingHandle,
  columns,
}: TableBuilderProps) => {
  const [rawData, setRawData] = useState(new DataPaginationEmpty());
  useEffect(() => {
    setRawData(stardardData(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleTableChange = (
    newPagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    console.log(newPagination, filters, sorter);
    newPagination.current = newPagination.current
      ? newPagination.current - 1
      : 0;
    paginationHandle.setPagination(newPagination);
    if (
      sortHandle &&
      !Array.isArray(sorter) &&
      sorter.hasOwnProperty('field')
    ) {
      sortHandle.setSort({
        sort_by: sorter.field as string,
        order_by: sorter.order === 'ascend' ? 'asc' : ('desc' as string),
      });
    }
  };

  return (
    <div className='table-container'>
      <Table
        columns={columns}
        dataSource={rawData.data}
        pagination={{
          current: rawData.meta.page + 1,
          pageSize: rawData.meta.size,
          total: rawData.meta.count,
        }}
        loading={loadingHandle.loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

const stardardData = (data: DataPagination) => {
  data.data.map((item) => {
    item.key = item._id;
    return item as any;
  });

  return data;
};

const TableBuilderViewDetailRecord = ({
  props,
  record,
}: {
  props: TableBuilderProps;
  record: any;
}) => {
  return (
    <Space size='middle'>
      <Tooltip title='Chỉnh sửa'>
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            if (props.onViewDetailRecord) {
              props.onViewDetailRecord(record);
            }
          }}
        />
      </Tooltip>
    </Space>
  );
};

export { TableBuilder, TableBuilderViewDetailRecord };
