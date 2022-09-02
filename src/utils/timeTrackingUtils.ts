import useApi from 'hooks/useApi';
import Json from 'types/Json';
import { LogTimeTrackingByUserDataType } from 'types/LogTimeTrackingByUserDataType';
import { LogTimeTrackingDataType } from 'types/LogTimeTrackingDataType';
import { LogTimeTrackingItemDataType } from 'types/LogTimeTrackingItemDataType';
import ProjectResponse from 'types/ProjectResponse';
import { TimeTrackingDataType } from 'types/TimeTrackingDataType';
import TimeTrackingResponse, {
  TimeTrackingDataItem,
} from 'types/TimeTrackingResponse';
import { WorkspaceDataType } from 'types/WorkspaceDataType';
import { getFormatDate } from './utils';

export function getAllWorkspace(callback: Function) {
  useApi.get('/companies/', {
    authen: true,
    params: {
      search: '',
      page: 1,
    },
    onSuccess(res: WorkspaceDataType) {
      useApi.get('/companies/', {
        authen: true,
        params: {
          search: '',
          page: 1,
        },
        onSuccess(res: WorkspaceDataType) {
          callback(res);
        },
      });
    },
  });
}

export function getAllProjectInWorkspace(
  workspace: string,
  callback: Function
) {
  if (workspace) {
    useApi.get('/projects/', {
      authen: true,
      params: {
        company_slug: workspace,
      },
      onSuccess: (res: ProjectResponse) => {
        callback(res);
      },
    });
  }
}

export function getFormatTimeTracking(seconds: number) {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds - hour * 3600) / 60);
  const second = Math.floor(seconds - hour * 3600 - minute * 60);
  return `${hour}h ${minute}m ${second}s`;
}

export function caculateTimeTracking(
  resultList: Json,
  request: Json,
  callback: Function
) {
  const result: TimeTrackingDataType = {
    startDate: request.dateRange
      ? new Date(request.dateRange[0]).toISOString().split('T')[0] + ' 00:00:00'
      : '',
    endDate: request.dateRange
      ? new Date(request.dateRange[1]).toISOString().split('T')[0] + ' 23:59:00'
      : '',
    value: {
      data: [],
      resume: {
        period_end: '',
        period_start: '',
        time_total: 0,
        worked_hours: '',
      },
    },
  };

  let totalSeconds = 0;

  Object.entries(resultList).forEach(
    ([project, responseItem]: [key: string, value: Json]) => {
      const { timeTrackingResponse, projectInfo } = responseItem;
      //data handle
      timeTrackingResponse.data.forEach(
        (timeTrackingDataItem: TimeTrackingDataItem) => {
          const memberInfoExistedList = result.value.data.filter(
            (timeTrackingDataItemInResult) =>
              timeTrackingDataItemInResult.user.username ===
              timeTrackingDataItem.user.username
          );
          if (memberInfoExistedList.length === 0) {
            timeTrackingDataItem.detail = {
              [projectInfo.name]: { ...timeTrackingDataItem.time },
            };

            result.value.data.push(timeTrackingDataItem);
          } else {
            const userInfo = memberInfoExistedList[0];

            if (userInfo.detail) {
              userInfo.detail[projectInfo.name] = timeTrackingDataItem.time;
            }
            userInfo.time.seconds += timeTrackingDataItem.time.seconds;
            // userInfo.time.seconds = timeTrackingDataItem.time.seconds;
            userInfo.time.formatted = getFormatTimeTracking(
              userInfo.time.seconds
            );
          }

          totalSeconds += timeTrackingDataItem.time.seconds;
        }
      );

      //resume handle
      const timeTrackingResume = timeTrackingResponse.resume;
      result.value.resume.time_total += timeTrackingResume.time_total;
      if (result.startDate === '') {
        result.startDate = timeTrackingResume.period_start;
      } else {
        if (
          timeTrackingResume.period_start &&
          new Date(result.startDate) > new Date(timeTrackingResume.period_start)
        ) {
          result.startDate = timeTrackingResume.period_start;
        }
      }

      if (result.endDate === '') {
        result.endDate = timeTrackingResume.period_end;
      } else {
        if (
          timeTrackingResume.period_end &&
          new Date(result.endDate) < new Date(timeTrackingResume.period_end)
        ) {
          result.endDate = timeTrackingResume.period_end;
        }
      }

      result.value.resume.period_start = result.startDate;
      result.value.resume.period_end = result.endDate;
      result.value.resume.worked_hours = getFormatTimeTracking(totalSeconds);
      result.detail = resultList;
    }
  );

  result.value.data.sort(
    (current, next) => next.time.seconds - current.time.seconds
  );

  callback(result);
}
export function getTimeTracking({
  request,
  callback,
}: {
  request: Json;
  callback: Function;
}) {
  getAllProjectInWorkspace(
    request.workspace,
    (projectResponse: ProjectResponse) => {
      const resultList: Json = {};
      if (projectResponse.data.length > 0) {
        projectResponse.data.forEach((projectInfo) => {
          useApi.get('/time-trackings/by-users/', {
            authen: true,
            params: {
              company_slug: request.workspace,
              project_slug: projectInfo.slug,
              start:
                request.dateRange.length > 0
                  ? new Date(request.dateRange[0]).toISOString().split('T')[0] +
                    ' 00:00:00'
                  : '',
              end:
                request.dateRange.length > 0
                  ? new Date(request.dateRange[1]).toISOString().split('T')[0] +
                    ' 23:59:00'
                  : '',
              users: null,
              page: 1,
            },
            onSuccess: (timeTrackingResponse: TimeTrackingResponse) => {
              resultList[projectInfo.slug] = {
                timeTrackingResponse,
                projectInfo,
              };

              if (
                Object.keys(resultList).length === projectResponse.data.length
              ) {
                caculateTimeTracking(resultList, request, callback);
              }
            },
          });
        });
      } else {
        caculateTimeTracking(resultList, request, callback);
      }
    }
  );
}

export function getLogTimeTracking(
  request: Json,
  getLogTimeTrackingCallback: Function
) {
 
  function getLogTimeTrackingByPage(page: number, callback: Function) {
    useApi.get(
      `/time-trackings/?start=${getFormatDate(
        request.dateRange[0],
        'yyyy-MM-dd'
      )}%2000:00:00&end=${getFormatDate(
        request.dateRange[1],
        'yyyy-MM-dd'
      )}%2023:59:59`,
      {
        authen: true,

        params: {
          company_slug: 'stalk',
          project_slug: 's-talk-website',
          page: page,
          users: '',
          // start:
          //   request.dateRange.length > 0
          //     ? `${
          //         new Date(request.dateRange[0]).toISOString().split('T')[0]
          //       } 00:00:00`
          //     : '',
          // end:
          //   request.dateRange.length > 0
          //     ? `${
          //         new Date(request.dateRange[1]).toISOString().split('T')[0]
          //       } 23:59:00`
          //     : '',
        },
        onSuccess: (res: any) => {
          callback(res);

          // process_wb(wb);
        },
      }
    );
  }

  getLogTimeTrackingByPage(1, (res: LogTimeTrackingDataType) => {
    let totalPage = res.total_pages;
    function addData(
      result: LogTimeTrackingItemDataType[],
      newData: LogTimeTrackingDataType
    ) {
      return result.concat(newData.data.data);
    }
    let data: LogTimeTrackingItemDataType[] = [];

    data = addData(data, res);

    if (totalPage > 1) {
      let i = 1;
      do {
        i++;
        // eslint-disable-next-line no-loop-func
        getLogTimeTrackingByPage(i, (resData: LogTimeTrackingDataType) => {
          data = addData(data, resData);
          if (data.length === resData.total) getLogTimeTrackingCallback(data);
        });
      } while (i < totalPage);
    } else {
      getLogTimeTrackingCallback(data);
    }
  });
}

export function getLogTimeTrackingByUser(data: LogTimeTrackingItemDataType[]) {
  const result: LogTimeTrackingByUserDataType = {};
  data.forEach((item) => {
    const time = item.time.end.timestamp - item.time.start.timestamp;

    if (!Object.keys(result).includes(item.user.username)) {
      result[item.user.username] = {
        ...item.user,
        ...{ time: 0, task: [], point: 0 },
      };
    }
    result[item.user.username].time += time;
    result[item.user.username].task.push(item);
    result[item.user.username].point +=
      (time / 3600) * Number(item.task.effort.effort);
  });
  return result;
}
