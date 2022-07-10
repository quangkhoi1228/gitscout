import { Button, Card, DatePicker, Divider, Form } from 'antd';
import MemberList from 'components/TimeTracking/MemberList';
import Overview from 'components/TimeTracking/Overview';
import useApi from 'hooks/useApi';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { getAllWorkspace } from 'redux/workspace/workspaceReducer';
import TimeTrackingResponse from 'types/TimeTrackingResponse';
import { getMondayOfCurrentWeek, getSundayOfCurrentWeek } from 'utils/utils';
import Template from './Template';

const title = 'Time Tracking';

const TimeTracking = () => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const workspace = useSelector((state: RootState) => state.workspace.value);

  const dateFormat = 'YYYY-MM-DD';

  const [data, setData] = useState<TimeTrackingResponse>();
  const [dates, setDates] = useState<moment.Moment[]>([]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    console.log(form.getFieldsValue());
  };

  useEffect(() => {
    setDates([
      moment(getMondayOfCurrentWeek(), dateFormat),
      moment(getSundayOfCurrentWeek(), dateFormat),
    ]);
    useApi.get(
      '/time-trackings/by-users/?company_slug=aladin-it&project_slug=aladin&start=&end=&users=&page=1',
      {
        authen: true,
        onSuccess: (res: TimeTrackingResponse) => {
          setData(res);
        },
      }
    );
    dispatch(getAllWorkspace());

    console.log(workspace);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(dates);

  return (
    <Template title={title}>
      <Card className='time-tracking-filter-container' size='small'>
        <Form
          onFinish={onFinish}
          layout='inline'
          form={form}
          initialValues={{
            dateRange: [
              moment('01/01/2022', dateFormat),
              moment('02/03/2022', dateFormat),
            ],
          }}
        >
          <Form.Item label='Ngày' name={'dateRange'}>
            {/* <RangePicker
              defaultValue={[
                moment(getMondayOfCurrentWeek(), dateFormat),
                moment(getSundayOfCurrentWeek(), dateFormat),
              ]}
            /> */}

            <RangePicker format={dateFormat} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />

      <Overview data={data} />
      <MemberList data={data} />
    </Template>
  );
};

export default TimeTracking;
