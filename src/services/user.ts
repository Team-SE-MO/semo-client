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

const getUserFormList = async (
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: '/member/form',
  })
    .then(success)
    .catch(fail);
};

const updateUserFormStatus = async (
  formId: number,
  decisionStatus: 'approved' | 'denied',
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'patch',
    url: '/member/form',
    data: {
      formId,
      decisionStatus,
    },
  })
    .then(success)
    .catch(fail);
};

const registerMember = async (
  companyId: number,
  email: string,
  ownerName: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: '/member',
    data: {
      companyId,
      email,
      ownerName,
    },
  })
    .then(success)
    .catch(fail);
};

export {
  getLogin,
  getEmailStatus,
  createMemberRequest,
  getUserFormList,
  updateUserFormStatus,
  registerMember,
};
