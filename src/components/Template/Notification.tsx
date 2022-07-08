import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType, message: string) => {
  notification[type]({
    message: null,
    description: message,
  });
};

export function infoNotification(message: string) {
  openNotificationWithIcon('info', message);
}

export function successNotification(message: string) {
  openNotificationWithIcon('success', message);
}

export function warningNotification(message: string) {
  openNotificationWithIcon('warning', message);
}

export function errorNotification(message: string) {
  openNotificationWithIcon('error', message);
}
