import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { TimeTrackingDataItem } from 'types/TimeTrackingResponse';
import Member from './Member';

const MemberList = () => {
  const timeTracking = useSelector((state: RootState) => {
    return state.timeTracking.value;
  });

  const data = timeTracking?.value;
  // useEffect(() => {
  //   console.log(timeTracking);
  // }, [timeTracking]);
  return (
    <div className='time-tracking-member-list'>
      {data?.data.map((dataItem: TimeTrackingDataItem) => (
        <Member key={dataItem.user.username} dataItem={dataItem} />
      ))}
    </div>
  );
};

export default MemberList;
