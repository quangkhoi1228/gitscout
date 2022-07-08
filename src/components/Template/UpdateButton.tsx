import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import { FormInstance } from 'antd/es/form';

interface Props {
  form: FormInstance;
  onUpdate: Function;
}

const UpdateButton = ({ form, onUpdate }: Props) => {
  const { confirm } = Modal;

  const onClick = () => {
    form
      .validateFields()
      .then((data) => {
        confirm({
          title: 'Bạn chắc chắn!',
          icon: <ExclamationCircleOutlined />,
          okText: 'Có',
          cancelText: 'Không',
          onOk() {
            onUpdate(data);
          },
          onCancel() {},
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <Button className='blue-button' onClick={onClick}>
      Sửa
    </Button>
  );
};

export default UpdateButton;
