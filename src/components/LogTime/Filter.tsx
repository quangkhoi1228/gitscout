import { Button, Card, DatePicker, Form, Radio, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLogTimeTrackingData } from 'redux/reducer/logTimeTrackingReducer';
import { LogTimeTrackingItemDataType } from 'types/LogTimeTrackingItemDataType';
import { getLogTimeTracking } from 'utils/timeTrackingUtils';
import { getMondayOfCurrentWeek, getSundayOfCurrentWeek } from 'utils/utils';

const Filter = () => {
  const [loading, setLoading] = useState(false);
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();

  const [timeRange, setTimeRange] = useState<string>('month');

  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';

  const getTimeTrackingByFilter = () => {
    setLoading(true);
    const request = form.getFieldsValue();
    console.log(request);
    request['workspace'] = 'stalk';

    getLogTimeTracking(request, (data: LogTimeTrackingItemDataType[]) => {
      dispatch(setLogTimeTrackingData(data));
      setLoading(false);
    });
  };

  useEffect(() => {
    let dateRange;
    const date = new Date();

    switch (timeRange) {
      case 'today':
        dateRange = [moment(date, dateFormat), moment(date, dateFormat)];
        break;
      case 'yesterday':
        let start = moment(
          new Date(new Date().setDate(new Date().getDate() - 1)),
          dateFormat
        );
        let end = moment(
          new Date(new Date().setDate(new Date().getDate() - 1)),
          dateFormat
        );
        dateRange = [start, end];
        break;
      case 'month':
        start =
          date.getDate() > 25
            ? moment(
                new Date(date.getFullYear(), date.getMonth(), 26),
                dateFormat
              )
            : moment(
                new Date(date.getFullYear(), date.getMonth() - 1, 26),
                dateFormat
              );

        end =
          date.getDate() > 25
            ? moment(
                new Date(date.getFullYear(), date.getMonth() + 1, 25),
                dateFormat
              )
            : moment(
                new Date(date.getFullYear(), date.getMonth(), 25),
                dateFormat
              );
        dateRange = [start, end];
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
    getTimeTrackingByFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  return (
    <>
      <Card className='time-tracking-filter-container' size='small'>
        <Form onFinish={getTimeTrackingByFilter} layout='inline' form={form}>
          <Space size={[8, 16]} wrap>
            <Form.Item label='Thời gian'>
              <Radio.Group
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <Radio.Button value='today'>Hôm nay</Radio.Button>
                <Radio.Button value='yesterday'>Hôm qua</Radio.Button>
                <Radio.Button value='week'>Tuần này</Radio.Button>
                <Radio.Button value='month'>Tháng này</Radio.Button>
                <Radio.Button value='custom'>Tuỳ chỉnh</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item name={'dateRange'}>
              <RangePicker
                format={dateFormat}
                onChange={() => {
                  getTimeTrackingByFilter();
                }}
              />
            </Form.Item>
            <Form.Item style={{ alignItems: 'end' }}>
              <Button type='primary' htmlType='submit' loading={loading}>
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
