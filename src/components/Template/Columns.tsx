import { Row } from 'antd';

interface Props {
  children: JSX.Element | JSX.Element[];
}
const Columns = ({ children }: Props) => {
  return (
    <Row gutter={[24, 0]} wrap={true}>
      {children}
    </Row>
  );
};
export default Columns;
