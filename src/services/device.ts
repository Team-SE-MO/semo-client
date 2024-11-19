import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const getDeviceList = async (
  page: number | null,
  companyId: number | null,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: '/device',
    params: {
      page,
      companyId,
    },
  })
    .then(success)
    .catch(fail);
};

const postDevice = async (
  deviceAlias: string,
  dataBaseInfo: {
    type: string;
    ip: string;
    port: number;
    sid: string;
    username: string;
    password: string;
  },
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: '/device',
    data: {
      deviceAlias,
      dataBaseInfo,
    },
  })
    .then(success)
    .catch(fail);
};

const testConnection = async (
  type: string,
  ip: string,
  port: number,
  sid: string,
  username: string,
  password: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: '/device/hc',
    data: {
      type,
      ip,
      port,
      sid,
      username,
      password,
    },
  })
    .then(success)
    .catch(fail);
};

const patchDevice = async (
  targetDevice: string,
  updateDeviceAlias: string,
  updateDeviceInfo: {
    type: string;
    ip: string;
    port: number;
    sid: string;
    username: string;
    password: string;
  },
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'patch',
    url: '/device',
    data: {
      targetDevice,
      updateDeviceAlias,
      updateDeviceInfo,
    },
  })
    .then(success)
    .catch(fail);
};

const deleteDevice = async (
  deviceAlias: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'delete',
    url: '/device',
    params: {
      deviceAlias,
    },
  })
    .then(success)
    .catch(fail);
};

export { getDeviceList, postDevice, testConnection, patchDevice, deleteDevice };
