/* eslint-disable camelcase */
import type { Store } from '@reduxjs/toolkit';
import { RootStackNavigationTypes, ROUTERS } from '@/src/routes';
import { clearAuth } from '@/src/stores/reducers/auth';
import { NavigationContainerRef } from '@react-navigation/native';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { navigationRef } from 'react-navigation-helpers';

export const HttpClient = axios.create({
  timeout: 90000,
  headers: {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
  },
});

// Mutable reference to the Redux store to avoid import cycles
let injectedStore: Store | null = null;

export const injectStore = (store: Store) => {
  injectedStore = store;
};

const onRequest = (config: InternalAxiosRequestConfig<any>) => {
  const state = injectedStore?.getState?.();
  const auth = (state as any).auth;
  const token = auth?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (
    originalRequest &&
    error.response?.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    // Add your token refresh logic here if needed
  }

  if (error.response?.status === 403) {
    injectedStore?.dispatch?.(clearAuth());
    const nav = navigationRef.current as NavigationContainerRef<RootStackNavigationTypes>;
    if (nav) {
      nav.navigate(ROUTERS.AuthMain);
    }
  }

  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

setupInterceptorsTo(HttpClient);

// Typed API methods
export const getData = <T>(url: string, params = {}): Promise<AxiosResponse<T>> => {
  return HttpClient.get<T>(url, { params });
};

export const postData = <T>(url: string, data = {}): Promise<AxiosResponse<T>> => {
  return HttpClient.post<T>(url, data);
};

export const patchData = <T>(url: string, data = {}): Promise<AxiosResponse<T>> => {
  return HttpClient.patch<T>(url, data);
};

export const deleteData = <T>(url: string, data = {}): Promise<AxiosResponse<T>> => {
  return HttpClient.delete<T>(url, { data });
};

export const putData = <T>(url: string, data = {}): Promise<AxiosResponse<T>> => {
  return HttpClient.put<T>(url, data);
};