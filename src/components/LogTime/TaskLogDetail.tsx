import { Avatar, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const TaskLogDetail = () => {
  const { logTimeTracking } = useSelector((state: RootState) => {
    return {
      workspace: state.workspace.value,
      logTimeTracking: state.logTimeTracking.value,
      timeTracking: state.timeTracking.value,
    };
  });
  useEffect(() => {
    console.log(logTimeTracking);
  }, [logTimeTracking]);

  return (
    <div className='time-tracking-member-list'>
      {logTimeTracking.map((item) => {
        const time = item.time.end.timestamp - item.time.start.timestamp;
        const point = Math.round(
          (time / 3600) * Number(item.task.effort.effort)
        );

        return (
          <div className='log-time-tracking-item' key={item.time.id}>
            <Card size='small'>
              <Meta
                avatar={<Avatar src={item.user.avatar} />}
                title={item.task.title}
                description={`${item.time.total} (${point}) - ${item.comment}`}
              />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default TaskLogDetail;
