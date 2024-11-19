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
  success: (response: AxiosResponse<Blob>) => void,
  fail: (error: AxiosError) => void,
  onProgress: (progress: number) => void,
  deviceAlias?: string,
  totalFileSize?: number
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
    method: 'get',
    url: '/file/download',
    params: {
      key: fileKey,
      ...(deviceAlias && { deviceAlias }),
    },
    onDownloadProgress: (progressEvent) => {
      if (totalFileSize) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / totalFileSize
        );
        onProgress(Math.min(percentCompleted, 99));
      } else if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(Math.min(percentCompleted, 99));
      } else {
        onProgress(0);
      }
    },
  })
    .then((response) => {
      onProgress(100);
      success(response);
    })
    .catch(fail);
};

export { getCompanyFileList, downloadFile };
