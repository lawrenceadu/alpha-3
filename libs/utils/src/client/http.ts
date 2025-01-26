'use client';

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'; // prettier-ignore

export const http = axios.create({
  timeout: 45000,
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<string>) => {
    if (error.response?.status !== 500) {
      if (error.response?.status === 401) {
        // logout?.();
      }

      return Promise.reject(error?.response?.data);
    }

    if (error.response?.status === 500) {
      return Promise.reject({ message: 'Internal server error' });
    }

    return;
  }
);

export default http;
