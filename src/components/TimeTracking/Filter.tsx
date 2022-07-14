import { Button, Card, DatePicker, Form, Radio, Select, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTimeTrackingData,
  setTimeTrackingLoading
} from 'redux/reducer/timeTrackingReducer';
import { setWorkspaceData } from 'redux/reducer/workspaceReducer';
import { RootState } from 'redux/store';
import { CompanyDataType } from 'types/CompanyDataType';
import { TimeTrackingDataType } from 'types/TimeTrackingDataType';
import { WorkspaceDataType } from 'types/WorkspaceDataType';
import { getAllWorkspace, getTimeTracking } from 'utils/timeTrackingUtils';
import { getMondayOfCurrentWeek, getSundayOfCurrentWeek } from 'utils/utils';

const Filter = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const dispatch = useDispatch();

  const [timeRange, setTimeRange] = useState<string>('week');

  const { workspace, timeTracking } = useSelector((state: RootState) => {
    return {
      workspace: state.workspace.value,
      timeTracking: state.timeTracking.value,
    };
  });

  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';

  const getTimeTrackingByFilter = () => {
    dispatch(setTimeTrackingLoading(true));
    const request = form.getFieldsValue();
    getTimeTracking({
      request,
      callback: (res: TimeTrackingDataType) => {
        dispatch(setTimeTrackingData(res));
        dispatch(setTimeTrackingLoading(false));
      },
    });
  };

  useEffect(() => {
    getAllWorkspace((res: WorkspaceDataType) => {
      dispatch(setWorkspaceData(res));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let dateRange;
    const date = new Date();

    switch (timeRange) {
      case 'today':
        dateRange = [moment(date, dateFormat), moment(date, dateFormat)];
        break;
      case 'month':
        dateRange = [
          moment(new Date(date.getFullYear(), date.getMonth(), 1), dateFormat),
          moment(
            new Date(date.getFullYear(), date.getMonth() + 1, 0),
            dateFormat
          ),
        ];
        break;
      case 'week':
      default:
        dateRange = [
          moment(getMondayOfCurrentWeek(), dateFormat),
          moment(getSundayOfCurrentWeek(), dateFormat),
        ];

        break;
    }
    form.setFieldsValue({
      dateRange: dateRange,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  useEffect(() => {
    form.setFieldsValue({
      workspace: workspace?.data[0].slug,
    });

    getTimeTrackingByFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace]);

  useEffect(() => {
    getTimeTrackingByFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  return (
    <>
      <Card className='time-tracking-filter-container' size='small'>
        <Form onFinish={getTimeTrackingByFilter} layout='inline' form={form}>
          <Space size={[8, 16]} wrap>
            <Form.Item label='Workspace' name='workspace'>
              <Select
                style={{ width: 150 }}
                onChange={() => {
                  getTimeTrackingByFilter();
                }}
              >
                {workspace?.data.map((company: CompanyDataType) => (
                  <Option key={company.slug} value={company.slug}>
                    {company.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Thời gian'>
              <Radio.Group
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <Radio.Button value='today'>Hôm nay</Radio.Button>
                <Radio.Button value='week'>Tuần này</Radio.Button>
                <Radio.Button value='month'>Tháng này</Radio.Button>
                <Radio.Button value='custom'>Tuỳ chỉnh</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name={'dateRange'}
              style={{ display: timeRange === 'custom' ? 'block' : 'none' }}
            >
              <RangePicker
                format={dateFormat}
                onChange={() => {
                  getTimeTrackingByFilter();
                }}
              />
            </Form.Item>
            <Form.Item style={{ alignItems: 'end' }}>
              <Button
                type='primary'
                htmlType='submit'
                loading={timeTracking?.loading}
              >
                Xem
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </>
  );
};

export default Filter;
