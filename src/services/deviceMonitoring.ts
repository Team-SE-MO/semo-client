import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from 'services';

const api = apiInstance();

const getMonitoringData = async (
  deviceAlias: string,
  interval: string,
  startTime: string,
  endTime: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'post',
    url: '/monitoring/chart',
    data: {
      deviceAlias,
      interval,
      startTime,
      endTime,
    },
  })
    .then(success)
    .catch(fail);
};

export default getMonitoringData;
