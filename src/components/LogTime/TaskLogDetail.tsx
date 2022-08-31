import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Json from 'types/Json';
import { LogTimeTrackingByUserDataType } from 'types/LogTimeTrackingByUserDataType';
import { LogTimeTrackingByUserItemDataType } from 'types/LogTimeTrackingByUserItemDataType';
import {
  getFormatTimeTracking,
  getLogTimeTrackingByUser
} from 'utils/timeTrackingUtils';

const TaskLogDetail = () => {
  const [logTimeData, setLogTimeData] = useState<
    LogTimeTrackingByUserDataType | undefined
  >();
  const { logTimeTracking } = useSelector((state: RootState) => {
    return {
      workspace: state.workspace.value,
      logTimeTracking: state.logTimeTracking.value,
      timeTracking: state.timeTracking.value,
    };
  });
  useEffect(() => {
    const result = getLogTimeTrackingByUser(logTimeTracking);
    console.log(result);
    setLogTimeData(result);
  }, [logTimeTracking]);

  return (
    <div className='time-tracking-member-list'>
      {logTimeData &&
        Object.values(logTimeData as Json).map(
          (item: LogTimeTrackingByUserItemDataType) => (
            <Card
              key={item.username}
              size='small'
              style={{ marginTop: '0.75rem' }}
            >
              <div className='member-container'>
                <div>
                  <img className='avatar' src={item.avatar} alt={item.name} />
                  <span className='name'>{item.name}</span>
                </div>
                <div className=''>
                  <span className='name'>
                    {getFormatTimeTracking(item.time)}
                  </span>
                </div>

                <div className=''>
                  <span className='name'>{Math.round(Number(item.point))}</span>
                </div>
              </div>
            </Card>
          )
        )}
    </div>
  );
};

export default TaskLogDetail;
