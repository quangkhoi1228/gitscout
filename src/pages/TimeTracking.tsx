import { Divider } from 'antd';
import Filter from 'components/TimeTracking/Filter';
import MemberList from 'components/TimeTracking/MemberList';
import Overview from 'components/TimeTracking/Overview';
import Template from './Template';

const title = 'Time Tracking';

const TimeTracking = () => {
  return (
    <Template title={title}>
      <Filter />
      <Divider />
      <Overview />
      <MemberList />
    </Template>
  );
};

export default TimeTracking;
