import { Button } from 'antd';
interface Props {
  onReload: Function;
}
const ReloadButton = ({ onReload }: Props) => {
  return (
    <Button
      className='white-button'
      onClick={() => {
        onReload();
      }}
    >
      Làm mới
    </Button>
  );
};

export default ReloadButton;
