import { Divider } from 'antd';
import Filter from 'components/LogTime/Filter';
import TaskLogDetail from 'components/LogTime/TaskLogDetail';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import Template from './Template';

const title = 'LogTime';

const LogTime = () => {
  return (
    <Template title={title}>
      <Filter />
      <Divider />
      <Columns>
        <Column span={12}>
          <TaskLogDetail />
        </Column>
      </Columns>
    </Template>
  );
};

export default LogTime;
