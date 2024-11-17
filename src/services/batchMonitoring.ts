import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from 'services';

const api = apiInstance();

const getSessionExecutionData = async (
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'get',
    url: '/monitoring/batch-chart',
  })
    .then(success)
    .catch(fail);
};

export { getSessionExecutionData };
