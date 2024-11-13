import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const getCompanies = async (
  keyword: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: '/company',
    params: {
      keyword,
    },
  })
    .then(success)
    .catch(fail);
};

const createCompanyRequest = async (
  email: string,
  companyName: string,
  taxId: string,
  ownerName: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/company/form',
    data: {
      email,
      companyName,
      taxId,
      ownerName,
    },
  })
    .then(success)
    .catch(fail);
};

const getCompanyFormList = async (
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: '/company/form',
  })
    .then(success)
    .catch(fail);
};

const updateCompanyFormStatus = async (
  formId: number,
  decisionStatus: 'approved' | 'denied',
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'patch',
    url: '/company/form',
    data: {
      formId,
      decisionStatus,
    },
  })
    .then(success)
    .catch(fail);
};

const registerCompany = async (
  formId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: `/company/${formId}`,
    params: {
      formId,
    },
  })
    .then(success)
    .catch(fail);
};

export {
  getCompanies,
  createCompanyRequest,
  getCompanyFormList,
  updateCompanyFormStatus,
  registerCompany,
};
