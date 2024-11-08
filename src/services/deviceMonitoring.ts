import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from 'services';

const api = apiInstance();

const getMonitoringData = async (
  token: string,
  deviceAlias: string,
  interval: string,
  startTime: string,
  endTime: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/monitoring/chart',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
