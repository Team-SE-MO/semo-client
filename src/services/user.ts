import { AxiosResponse, AxiosError } from 'axios';
import { apiFormInstance, apiInstance } from './index';

const api = apiInstance();
const apiForm = apiFormInstance();

const getLogin = async (
  username: string,
  password: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await apiForm({
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

const getEmailStatus = async (
  email: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await apiForm({
    method: 'get',
    url: '/member/email-check',
    params: {
      email,
    },
  })
    .then(success)
    .catch(fail);
};

const createMemberRequest = async (
  email: string,
  companyId: number,
  ownerName: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/member/form',
    data: {
      email,
      companyId,
      ownerName,
    },
  })
    .then(success)
    .catch(fail);
};

export { getLogin, getEmailStatus, createMemberRequest };
