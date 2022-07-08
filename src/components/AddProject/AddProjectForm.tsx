import { Button, DatePicker, DatePickerProps, Form, Input } from 'antd';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import Editor from 'components/Template/Editor';
import FileInput from 'components/Template/FileInput';
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const onChange: DatePickerProps['onChange'] = (
  date: any,
  dateString: string
) => {
  console.log(date, dateString);
};

const AddProjectForm = () => {
  return (
    <Form
      name='basic'
      // layout='vertical'
      // labelCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Columns>
        <ColItem span={12} name='name'>
          <Input placeholder='Tên dự án' />
        </ColItem>
        <ColItem span={12} name='code'>
          <Input placeholder='Mã dự án' />
        </ColItem>
        <ColItem span={12} name='address'>
          <Input placeholder='Địa chỉ' />
        </ColItem>
        <ColItem span={12}>
          <Input placeholder='Map' />
        </ColItem>
        <ColItem span={6} name='expectValue'>
          <Input placeholder='Giá trị' />
        </ColItem>
        <ColItem span={6} name='shares'>
          <Input placeholder='Số cổ phần' />
        </ColItem>
        <ColItem span={6} name='price'>
          <Input placeholder='Giá bán dự kiến' />
        </ColItem>
        <ColItem span={6} name='minBuy'>
          <Input placeholder='Đầu tư tối thiểu' />
        </ColItem>
        <ColItem span={6} name='timeStart'>
          <DatePicker
            style={{ width: '100%' }}
            placeholder='Bắt đầu'
            onChange={onChange}
          />
        </ColItem>
        <ColItem span={6} name='timeEnd'>
          <DatePicker
            style={{ width: '100%' }}
            placeholder='Kết thúc'
            onChange={onChange}
          />
        </ColItem>

        <ColItem>
          <FileInput label='Ảnh đại diện' />
        </ColItem>
        <ColItem>
          <Editor />
        </ColItem>

        <ColItem span={6}>
          <Button type='primary' htmlType='submit' block>
            Thêm dự án
          </Button>
        </ColItem>
      </Columns>
    </Form>
  );
};

const ColItem = ({
  span,
  name,
  children,
}: {
  span?: number;
  name?: string;
  children?: JSX.Element | JSX.Element[];
}) => {
  span = span ?? 24;
  return (
    <Column span={span}>
      <Form.Item
        name={name}
        rules={[{ required: true, message: 'Vui lòng nhập!' }]}
      >
        {children}
      </Form.Item>
    </Column>
  );
};

export default AddProjectForm;
