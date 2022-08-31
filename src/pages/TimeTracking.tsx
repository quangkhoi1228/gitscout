import { Divider } from 'antd';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import Filter from 'components/TimeTracking/Filter';
import MemberList from 'components/TimeTracking/MemberList';
import Overview from 'components/TimeTracking/Overview';
import TotalTimeChart from 'components/TimeTracking/TotalTimeChart';
import Template from './Template';

const title = 'Time Tracking';

const TimeTracking = () => {
  return (
    <Template title={title}>
      <Filter />
      <Divider />
      <Overview />
      <Columns>
        <Column span={12}>
          <TotalTimeChart />
        </Column>
        <Column span={12}>
          <MemberList />
        </Column>
      </Columns>
    </Template>
  );
};

export default TimeTracking;
