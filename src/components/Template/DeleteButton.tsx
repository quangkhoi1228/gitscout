import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import { FormInstance } from 'antd/es/form';

interface Props {
  form: FormInstance;
  onDelete: Function;
}

const DeleteButton = ({ form, onDelete }: Props) => {
  const { confirm } = Modal;

  const onClick = () => {
    // form
    //   .getFieldsValue()
    //   .then((data) => {
    confirm({
      title: 'Bạn chắc chắn!',
      icon: <ExclamationCircleOutlined />,
      okText: 'Có',
      cancelText: 'Không',
      onOk() {
        onDelete();
      },
      onCancel() {},
    });
    // })
    // .catch((e) => console.log(e));
  };

  return (
    <Button className='red-button' onClick={onClick}>
      Xoá
    </Button>
  );
};

export default DeleteButton;
