import useApi from 'hooks/useApi';
import Json from 'types/Json';
import ProjectResponse from 'types/ProjectResponse';
import { TimeTrackingDataType } from 'types/TimeTrackingDataType';
import TimeTrackingResponse, {
  TimeTrackingDataItem,
} from 'types/TimeTrackingResponse';
import { WorkspaceDataType } from 'types/WorkspaceDataType';

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

export function getFormatTime(seconds: number) {
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
      const { timeTrackingResponse } = responseItem;
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
              [project]: timeTrackingDataItem.time,
            };
            result.value.data.push(timeTrackingDataItem);
          } else {
            const userInfo = memberInfoExistedList[0];
            if (userInfo.detail) {
              userInfo.detail[project] = timeTrackingDataItem.time;
            }
            userInfo.time.seconds += timeTrackingDataItem.time.seconds;
            userInfo.time.formatted = getFormatTime(userInfo.time.seconds);
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
      result.value.resume.worked_hours = getFormatTime(totalSeconds);
      result.detail = resultList;
    }
  );

  // console.log( result.value.data[0].detail);

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

              console.log(timeTrackingResponse);
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
