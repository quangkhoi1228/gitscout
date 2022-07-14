import { Row } from 'antd';

interface Props {
  children?: JSX.Element | JSX.Element[];
  className?: string;
}
const Columns = ({ children, className }: Props) => {
  return (
    <Row gutter={[24, 24]} wrap={true} className={className}>
      {children}
    </Row>
  );
};
export default Columns;
