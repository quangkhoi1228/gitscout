import { Button, Card, DatePicker, Form, Select, Space } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeTrackingData } from 'redux/reducer/timeTrackingReducer';
import { setWorkspaceData } from 'redux/reducer/workspaceReducer';
import { RootState } from 'redux/store';
import { CompanyDataType } from 'types/CompanyDataType';
import TimeTrackingResponse from 'types/TimeTrackingResponse';
import { WorkspaceDataType } from 'types/WorkspaceDataType';
import {
  getAllWorkspace,
  getMondayOfCurrentWeek,
  getSundayOfCurrentWeek,
  getTimeTracking,
} from 'utils/utils';

const Filter = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const dispatch = useDispatch();

  const workspace = useSelector((state: RootState) => {
    return state.workspace.value;
  });

  const [form] = Form.useForm();
  const dateFormat = 'YYYY-MM-DD';

  const onFinish = (values: any) => {
    console.log(form.getFieldsValue());
  };

  useEffect(() => {
    getAllWorkspace((res: WorkspaceDataType) => {
      dispatch(setWorkspaceData(res));
    });

    getTimeTracking({
      workspace: 'a',
      callback: (res: TimeTrackingResponse) => {
        dispatch(setTimeTrackingData(res));
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      workspace: workspace?.data[0].name,
      dateRange: [
        moment(getMondayOfCurrentWeek(), dateFormat),
        moment(getSundayOfCurrentWeek(), dateFormat),
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace]);

  return (
    <>
      <Card className='time-tracking-filter-container' size='small'>
        <Form onFinish={onFinish} layout='inline' form={form}>
          <Space size={[8, 16]} wrap>
            <Form.Item label='Workspace' name='workspace'>
              <Select style={{ width: 150 }}>
                {workspace?.data.map((company: CompanyDataType) => (
                  <Option key={company.slug} value={company.slug}>
                    {company.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Ngày' name={'dateRange'}>
              <RangePicker format={dateFormat} />
            </Form.Item>
            <Form.Item style={{ alignItems: 'end' }}>
              <Button type='primary' htmlType='submit'>
                Tìm kiếm
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </>
  );
};

export default Filter;
