import useApi from 'hooks/useApi';
import TimeTrackingResponse from 'types/TimeTrackingResponse';
import { WorkspaceDataType } from 'types/WorkspaceDataType';

export function setShowMenu(value: boolean) {
  if (value) {
    document.body.classList.add('is-show-menu');
  } else {
    document.body.classList.remove('is-show-menu');
  }
}

export function formatNumber(input: any) {
  return input ? input.toLocaleString('en-US') : '';
}

export function getMondayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;

  const monday = new Date(today.setDate(first));
  return monday;
}

export function getSundayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const last = first + 6;

  const sunday = new Date(today.setDate(last));

  return sunday;
}

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

export function getTimeTracking({
  workspace,
  callback,
}: {
  workspace: string;
  callback: Function;
}) {
  useApi.get('/time-trackings/by-users/', {
    authen: true,
    params: {
      company_slug: 'aladin-it',
      project_slug: 'aladin',
      start: null,
      end: null,
      users: null,
      page: 1,
    },
    onSuccess: (res: TimeTrackingResponse) => {
      callback(res);
    },
  });
}
