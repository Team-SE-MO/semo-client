import { AxiosResponse, AxiosError } from 'axios';
import { apiLoginInstance } from './index';

const api = apiLoginInstance();

const getLogin = async (
  username: string,
  password: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/login',
    data: {
      username,
      password,
    },
  })
    .then(success)
    .catch(fail);
};

export default getLogin;
