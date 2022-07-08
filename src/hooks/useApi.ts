import axios, { AxiosRequestConfig } from 'axios';
import { errorNotification } from 'components/Template/Notification';
import { apiDomain } from 'config/serverConfig';
import { useNavigate } from 'react-router-dom';
import Json from 'types/Json';
import useLocalStorage from './useLocalStorage';

interface Props {
  params?: { [key: string]: any };
  onSuccess: Function;
  onFinally?: Function;
  authen?: boolean;
}

function getConfig({ authen, params }: { authen?: boolean; params?: Json }) {
  let config: AxiosRequestConfig = {};
  config.headers = {};
  if (authen) {
    const accessToken = useLocalStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      if (window.location.pathname !== '/login') {
        window.location.pathname = '/login';
      }
    }
  }

  if (params) {
    config.params = params;
  }

  return config;
}

function handleError(error: any) {
  console.log(error);
  const responseData = error.response.data;
  const message = responseData.message ?? responseData.errors[0];
  errorNotification(message);
}

function get(url: string, { authen, params, onSuccess, onFinally }: Props) {
  const config = getConfig({ authen, params });
  axios
    .get(`${apiDomain}${url}`, config)
    .then((res) => {
      const data: Json = res.data;
      onSuccess(data);
    })
    .catch((error) => {
      handleError(error);
    })
    .finally(() => (onFinally ? onFinally() : () => {}));
}

function post(url: string, { authen, params, onSuccess, onFinally }: Props) {
  const config = getConfig({ authen });

  axios
    .post(`${apiDomain}${url}`, params, config)
    .then((res) => {
      const data: { [key: string]: any } = res.data;
      onSuccess(data);
    })
    .catch((error) => {
      handleError(error);
    })
    .finally(() => onFinally && onFinally());
}

function put(url: string, { authen, params, onSuccess, onFinally }: Props) {
  const config = getConfig({ authen });

  axios
    .put(`${apiDomain}${url}`, params, config)
    .then((res) => {
      const data: { [key: string]: any } = res.data;
      onSuccess(data);
    })
    .catch((error) => {
      handleError(error);
    })
    .finally(() => onFinally && onFinally());
}

function detele(url: string, { authen, params, onSuccess, onFinally }: Props) {
  const config = getConfig({ authen });

  axios
    .delete(`${apiDomain}${url}`, config)
    .then((res) => {
      const data: { [key: string]: any } = res.data;
      onSuccess(data);
    })
    .catch((error) => {
      handleError(error);
    })
    .finally(() => onFinally && onFinally());
}

function setJwtData(data: { [key: string]: any }) {
  useLocalStorage.setItem('accessToken', data.accessToken);
  useLocalStorage.setItem('refreshToken', data.refreshToken);
  useLocalStorage.setItem('transactionTime', data.transactionTime);
}

function removeJwtData() {
  useLocalStorage.removeItem('accessToken');
  useLocalStorage.removeItem('refreshToken');
  useLocalStorage.removeItem('transactionTime');
}

const useApi = {
  get,
  post,
  put,
  detele,
  setJwtData,
  removeJwtData,
};

export default useApi;
