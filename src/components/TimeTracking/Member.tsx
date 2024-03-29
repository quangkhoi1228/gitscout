import { Card, Col, Row } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Json from 'types/Json';
import { LogTimeTrackingByUserDataType } from 'types/LogTimeTrackingByUserDataType';
import { TimeTrackingDataItem } from 'types/TimeTrackingResponse';
import { getLogTimeTrackingByUser } from 'utils/timeTrackingUtils';

const Member = ({
  dataItem,
  isShowDetail,
}: {
  dataItem: TimeTrackingDataItem;
  isShowDetail: boolean;
}) => {
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
      {isShowDetail && (
        <div className='member-detail'>
          {dataItem.detail && (
            <div className='member-project-time-tracking-container'>
              {Object.entries(dataItem.detail as Json).map(
                (value: [string, { seconds: number; formatted: string }]) => (
                  <Row
                    justify='space-between'
                    key={value[0]}
                    className='member-project-time-tracking-item'
                  >
                    <Col className='name'>
                      {value[0]}(
                      {Math.round(
                        (value[1].seconds / dataItem.time.seconds) * 100
                      )}
                      %)
                    </Col>

                    <Col className='value'>{value[1].formatted}</Col>
                  </Row>
                )
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default Member;
