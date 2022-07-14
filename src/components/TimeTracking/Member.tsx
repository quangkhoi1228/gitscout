import { Card } from 'antd';
import { TimeTrackingDataItem } from 'types/TimeTrackingResponse';

const Member = ({ dataItem }: { dataItem: TimeTrackingDataItem }) => {
  // console.log(dataItem);
  return (
    <Card size='small' style={{ marginTop: '0.75rem' }}>
      <div className='member-container'>
        <div>
          <img
            className='avatar'
            src={dataItem.user.avatar}
            alt={dataItem.user.name}
          />
          <span className='name'>{dataItem.user.name}</span>
        </div>
        <div className=''>
          <span className='time'>{dataItem.time.formatted}</span>
        </div>
      </div>
    </Card>
  );
};

export default Member;
