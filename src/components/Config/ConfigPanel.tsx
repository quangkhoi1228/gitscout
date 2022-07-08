import { Col, Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import TextArea from 'antd/lib/input/TextArea';
import CreateButton from 'components/Template/CreateButton';
import DeleteButton from 'components/Template/DeleteButton';
import {
  errorNotification,
  successNotification,
} from 'components/Template/Notification';
import ReloadButton from 'components/Template/ReloadButton';
import UpdateButton from 'components/Template/UpdateButton';
import useApi from 'hooks/useApi';
import ConfigDataType from 'types/ConfigDataType';

interface Props {
  form: FormInstance;
  recordDetailInfo: {
    recordDetail?: ConfigDataType;
    setRecordDetail: Function;
  };
  reloadDataTable: Function;
}
const ConfigPanel = ({ form, recordDetailInfo, reloadDataTable }: Props) => {
  const onCreate = (data: ConfigDataType) => {
    data.data = {
      data: data.data,
    };

    useApi.post('/api/v1/parameters', {
      authen: true,
      params: data,
      onSuccess: (res: any) => {
        if (res.message === 'success') {
          successNotification('Thêm cấu hình thành công');
          reloadDataTable();
        }
      },
    });
  };

  const onUpdate = (data: ConfigDataType) => {
    if (recordDetailInfo.recordDetail) {
      data.data = {
        data: data.data,
      };

      console.log(data);

      useApi.put(`/api/v1/parameters/${recordDetailInfo.recordDetail._id}`, {
        authen: true,
        params: data,
        onSuccess: (res: any) => {
          if (res.message === 'success') {
            successNotification('Cập nhật cấu hình thành công');
            reloadDataTable();
          }
        },
      });
    } else {
      errorNotification('Chưa chọn record nào để chỉnh sửa');
    }
  };

  const onDelete = () => {
    if (recordDetailInfo.recordDetail) {
      useApi.detele(`/api/v1/parameters/${recordDetailInfo.recordDetail._id}`, {
        authen: true,
        onSuccess: (res: any) => {
          if (res.message === 'success') {
            successNotification('Xoá cấu hình thành công');
            reloadDataTable();
          }
        },
      });
    } else {
      errorNotification('Chưa chọn record nào để xoá');
    }
  };

  return (
    <Form labelCol={{ span: 4 }} form={form}>
      <Form.Item label='Tên' name='name' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Code' name='code' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Mô tả' name='description' rules={[{ required: true }]}>
        <TextArea />
      </Form.Item>
      <Form.Item label='Giá trị' name='data' rules={[{ required: true }]}>
        <TextArea />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col>
          <CreateButton form={form} onCreate={onCreate} />
        </Col>
        <Col
          style={{ display: recordDetailInfo.recordDetail ? 'block' : 'none' }}
        >
          <UpdateButton form={form} onUpdate={onUpdate} />
        </Col>
        <Col
          style={{ display: recordDetailInfo.recordDetail ? 'block' : 'none' }}
        >
          <DeleteButton form={form} onDelete={onDelete} />
        </Col>
        <Col>
          <ReloadButton onReload={() => reloadDataTable()} />
        </Col>
      </Row>
    </Form>
  );
};

export default ConfigPanel;
