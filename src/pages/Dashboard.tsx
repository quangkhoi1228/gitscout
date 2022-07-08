import OverviewInfo from 'components/Dashboard/OverviewInfo';
import Revenue from 'components/Dashboard/Revenue';
import Template from './Template';

const title = 'Dashboard';
const Dashboard = () => {
  return (
    <Template title={title}>
      <OverviewInfo />
      <Revenue />
    </Template>
  );
};

export default Dashboard;
