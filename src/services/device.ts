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

export { getDeviceList };
