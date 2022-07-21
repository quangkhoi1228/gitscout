import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { TimeTrackingDataItem } from 'types/TimeTrackingResponse';
import Member from './Member';

const MemberList = () => {
  const timeTracking = useSelector((state: RootState) => {
    return state.timeTracking.value;
  });

  const [isShowDetail, setIsShowDetail] = useState(false);

  const data = timeTracking?.value;
  useEffect(() => {
    console.log(timeTracking);
  }, [timeTracking]);
  return (
    <div className='time-tracking-member-list'>
      {data?.data && data.data.length > 0 && (
        <div className='time-tracking-control'>
          <Switch
            checkedChildren='Chi tiết'
            unCheckedChildren='Đơn giản'
            defaultChecked={isShowDetail}
            onChange={() => setIsShowDetail(!isShowDetail)}
          />
        </div>
      )}
      {data?.data.map((dataItem: TimeTrackingDataItem) => (
        <Member
          key={dataItem.user.username}
          dataItem={dataItem}
          isShowDetail={isShowDetail}
        />
      ))}
    </div>
  );
};

export default MemberList;
