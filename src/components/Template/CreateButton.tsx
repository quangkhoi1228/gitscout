import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import { FormInstance } from 'antd/es/form';

interface Props {
  form: FormInstance;
  onCreate: Function;
}

const CreateButton = ({ form, onCreate }: Props) => {
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
            onCreate(data);
          },
          onCancel() {},
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <Button className='green-button' onClick={onClick}>
      Thêm
    </Button>
  );
};

export default CreateButton;
