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

export { getCompanies, createCompanyRequest };
