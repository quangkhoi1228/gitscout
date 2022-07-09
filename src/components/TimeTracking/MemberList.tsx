import { Card } from 'antd';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import { useEffect } from 'react';
import TimeTrackingResponse, {
  TimeTrackingDataItem,
} from 'types/TimeTrackingResponse';

const MemberList = ({ data }: { data: TimeTrackingResponse | undefined }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className='time-tracking-member-list'>
      {data?.data.map((dataItem: TimeTrackingDataItem, index) => (
        <Card key={index} size='small' style={{ marginTop: '0.75rem' }}>
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
      ))}
    </div>
  );
};

export default MemberList;
