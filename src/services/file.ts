import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const getCompanyFileList = async (
  date: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: '/file',
    params: {
      date,
    },
  })
    .then(success)
    .catch(fail);
};

const downloadFile = async (
  fileKey: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void,
  deviceAlias?: string
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: {
      Authorization: `Bearer ${token}`,
      responseType: 'blob',
    },
    method: 'get',
    url: '/file/download',
    params: {
      key: fileKey,
      ...(deviceAlias && { deviceAlias }),
    },
  })
    .then(success)
    .catch(fail);
};

export { getCompanyFileList, downloadFile };
