import axios, { AxiosInstance } from 'axios';

const URL = 'http://localhost:8080/api/v1';

const apiInstance = (): AxiosInstance => {
  const AxiosInst = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return AxiosInst;
};

const apiFormInstance = (): AxiosInstance => {
  const AxiosInst = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return AxiosInst;
};

const apiLoginInstance = (): AxiosInstance => {
  const AxiosInst = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return AxiosInst;
};

export { apiInstance, apiFormInstance, apiLoginInstance };
