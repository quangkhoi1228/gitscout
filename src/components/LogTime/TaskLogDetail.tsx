import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Json from 'types/Json';
import { LogTimeTrackingByUserDataType } from 'types/LogTimeTrackingByUserDataType';
import {
  getFormatTimeTracking,
  getLogTimeTrackingByUser
} from 'utils/timeTrackingUtils';

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    render: (_: any, record: Json) => (
      <div className=''>
        <img className='avatar' src={record.avatar} alt={record.name} />
        <span className='name'>{record.name}</span>
      </div>
    ),
  },
  {
    title: 'Tổng thời gian',
    dataIndex: 'time',
    key: 'time',
    render: (text: number) => <div>{getFormatTimeTracking(text)}</div>,
  },
  {
    title: 'Point',
    dataIndex: 'point',
    key: 'point',
    render: (text: string) => <div>{Math.round(Number(text))}</div>,
  },
];

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
    setLogTimeData(result);
  }, [logTimeTracking]);

  return (
    <div className='time-tracking-member-list'>
      {logTimeData && (
        <Table
          pagination={false}
          dataSource={Object.values(logTimeData as Json)
            .map((item) => {
              return { ...item, key: item.username };
            })
            .sort((a, b) => b.time - a.time)}
          columns={columns}
        />
      )}
    </div>
  );
};

export default TaskLogDetail;
