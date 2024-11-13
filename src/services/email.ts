import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const sendEmail = async (
  apiType: string,
  value: string | number,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: '/mail',
    data: {
      apiType,
      value,
    },
  })
    .then(success)
    .catch(fail);
};

const verifyEmail = async (
  email: string,
  authCode: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/mail/valid',
    data: {
      email,
      authCode,
    },
  })
    .then(success)
    .catch(fail);
};

const sendAuthCode = async (
  email: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/mail/auth',
    params: {
      email,
    },
  })
    .then(success)
    .catch(fail);
};
export { sendEmail, verifyEmail, sendAuthCode };
