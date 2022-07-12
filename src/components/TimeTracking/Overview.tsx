import { Card } from 'antd';
import Column from 'components/Template/Column';
import Columns from 'components/Template/Columns';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const gridStyle: React.CSSProperties = {
  textAlign: 'left',
};

const Overview = () => {
  const timeTracking = useSelector((state: RootState) => {
    return state.timeTracking.value;
  });

  const data = timeTracking?.value;
  return (
    <div className='time-tracking-overview'>
      <Columns>
        <Column span={6}>
          <Card style={gridStyle} size='small'>
            <div className='value'>{data?.data.length ?? ''}</div>
            <div className='label'>Thành viên</div>
          </Card>
        </Column>
        <Column span={6}>
          <Card style={gridStyle} size='small'>
            <div className='value'>{data?.resume.worked_hours}</div>
            <div className='label'>Tổng giờ làm</div>
          </Card>
        </Column>
        <Column span={6}>
          <Card style={gridStyle} size='small'>
            <div className='value'>
              {data?.resume.period_start
                ? data.resume.period_start.split(' ')[0]
                : ''}
            </div>
            <div className='label'>Task đầu tiên</div>
          </Card>
        </Column>
        <Column span={6}>
          <Card style={gridStyle} size='small'>
            <div className='value'>
              {data?.resume.period_end
                ? data.resume.period_end.split(' ')[0]
                : ''}
            </div>
            <div className='label'>Task cuối cùng</div>
          </Card>
        </Column>
      </Columns>
    </div>
  );
};

export default Overview;
