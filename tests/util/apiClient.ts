import { request } from '@playwright/test';
import { getValidToken } from './token';
import { getEnvironmentBasePathForAPI } from './index';

export async function createApiContext() {
  const token = await getValidToken();

  return request.newContext({
    baseURL: getEnvironmentBasePathForAPI(),
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
