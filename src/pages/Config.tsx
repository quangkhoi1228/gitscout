import { Card, Form, TablePaginationConfig } from 'antd';
import ConfigPanel from 'components/Config/ConfigPanel';
import ConfigTable from 'components/Config/ConfigTable';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import useApi from 'hooks/useApi';
import { useEffect, useState } from 'react';
import ApiResponse from 'types/ApiResponse';
import ConfigDataType from 'types/ConfigDataType';
import DataPagination, { DataPaginationEmpty } from 'types/DataPagination';
import Template from './Template';
const title = 'Cấu hình';

const Config = () => {
  const api = '/api/v1/parameters';
  const [form] = Form.useForm();

  const [recordDetail, setRecordDetail] = useState<ConfigDataType>();
  const [data, setData] = useState<DataPagination>(new DataPaginationEmpty());
  const [filters, setFilters] = useState({
    name: null,
    status: null,
  });

  const [sort, setSort] = useState({});
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 0,
    pageSize: 5,
    total: 0,
  });

  const getListData = () => {
    setLoading(true);
    useApi.get(api, {
      authen: true,
      params: {
        ...filters,
        ...sort,
        size: pagination.pageSize,
        page: pagination.current,
      },
      onSuccess: (data: ApiResponse) => {
        setData(data);
      },
      onFinally: () => setLoading(false),
    });
  };

  const reloadDataTable = (pageNum?: number) => {
    form.resetFields();
    setPagination({ ...pagination, current: 0 });
    setRecordDetail(undefined);
  };

  const onViewDetailRecord = (record: ConfigDataType) => {
    //bóc tách các trường của data cho vào json ban đầu
    record = { ...record, ...record.data };
    form.resetFields();
    form.setFieldsValue(record);
    setRecordDetail(record);
  };

  useEffect(() => {
    getListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, pagination]);

  return (
    <Template title={title}>
      <section className='config-container'>
        <h2>{title}</h2>

        <Columns>
          <Column span={10}>
            <Card
              title={
                <>
                  Chi tiết
                  {recordDetail ? (
                    <strong className='has-text-primary'>
                      {' '}
                      {recordDetail?._id}{' '}
                    </strong>
                  ) : (
                    ''
                  )}
                </>
              }
              bordered={false}
            >
              <ConfigPanel
                form={form}
                reloadDataTable={reloadDataTable}
                recordDetailInfo={{ recordDetail, setRecordDetail }}
              />
            </Card>
          </Column>

          <Column span={'auto'}>
            <Card title='Danh sách' bordered={false}>
              <ConfigTable
                data={data}
                paginationHandle={{ pagination, setPagination }}
                sortHandle={{ sort, setSort }}
                filtersHandle={{ filters, setFilters }}
                loadingHandle={{ loading, setLoading }}
                onViewDetailRecord={onViewDetailRecord}
              />
            </Card>
          </Column>
        </Columns>
      </section>
    </Template>
  );
};

export default Config;
