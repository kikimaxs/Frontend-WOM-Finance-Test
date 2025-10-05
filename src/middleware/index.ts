import type { Middleware } from '@reduxjs/toolkit';

export const MiddlewarePerfMonitor: Middleware = () => (next) => (action) => {
  const start = Date.now();
  const result = next(action);
  const duration = Date.now() - start;
  if (__DEV__) {
    // Basic perf log for actions
    // eslint-disable-next-line no-console
    console.log(`[Perf] ${String((action as any)?.type)} took ${duration}ms`);
  }
  return result;
};

export default MiddlewarePerfMonitor;