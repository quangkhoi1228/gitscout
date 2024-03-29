import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { TimeTrackingDataItem } from 'types/TimeTrackingResponse';
const TotalTimeChart = () => {
  const timeTracking = useSelector((state: RootState) => {
    return state.timeTracking.value;
  });

  const [data, setData] = useState<{ name: string; y: number }[] | undefined>(
    []
  );

  useEffect(() => {
    let newData = timeTracking?.value.data.map((item: TimeTrackingDataItem) => {
      return { name: item.user.name, y: item.time.seconds / 3600 };
    });

    setData(newData);
  }, [timeTracking]);

  const options = {
    chart: {
      type: 'column',
      height: Math.max(
        14 *
          (4.75 * (timeTracking ? timeTracking.value.data.length : 0) + 2.75),
        250
      ),
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: 'category',
    },
    legend: { enabled: false },

    yAxis: {
      title: {
        enabled: false,
      },
    },
    tooltip: {
      formatter: function (): any {
        const data: any = this;
        return `${data.key}`;
      },
    },
    accessibility: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: null,
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <div>
      {timeTracking && timeTracking.value.data.length > 0 && (
        <div className='time-tracking-total-time-chart-container'>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
    </div>
  );
};

export default TotalTimeChart;
