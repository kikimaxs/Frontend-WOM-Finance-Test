/* eslint-disable no-unsafe-finally */
import { RootState } from '@/src/configs/store';
import type { ThunkMiddleware, UnknownAction } from '@reduxjs/toolkit';
import { HttpClient } from '../utils/httpclient';

const middlewarePerfMonitor: ThunkMiddleware<RootState, UnknownAction> =
  () => (next) => (event) => {
    HttpClient.interceptors.response.use(
      async (response: any) => {
        try {
          // Request was successful, e.g. HTTP code 200

          const { httpMetric } = response.config.metadata;

          httpMetric.setHttpResponseCode(response.status);
          httpMetric.setResponseContentType(response.headers['content-type']);
          await httpMetric.stop();
        } finally {
          return response;
        }
      },
      async (error) => {
        try {
          // Request failed, e.g. HTTP code 500

          const { httpMetric } = error.config.metadata;

          httpMetric.setHttpResponseCode(error.response.status);
          httpMetric.setResponseContentType(
            error.response.headers['content-type'],
          );
          await httpMetric.stop();
        } finally {
          // Ensure failed requests throw after interception
          return Promise.reject(error);
        }
      },
    );

    return next(event);
  };

export default middlewarePerfMonitor;
