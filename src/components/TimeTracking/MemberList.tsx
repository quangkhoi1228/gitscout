import { Card } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { TimeTrackingDataItem } from 'types/TimeTrackingResponse';

const MemberList = () => {
  const timeTracking = useSelector((state: RootState) => {
    return state.timeTracking.value;
  });

  const data = timeTracking?.value;
  useEffect(() => {
    // console.log(data);
  }, [timeTracking]);
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
