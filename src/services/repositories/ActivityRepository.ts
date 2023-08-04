import type { GenericAbortSignal } from 'axios';

import ApiClient from '../ApiClient';
import { AccountBaseType } from '../config';

import { ApiActivity } from '../api-interface';
import activityMapper from '../mappers/activityMapper';

export async function list(
  type: AccountBaseType,
  accountId: string,
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Array<ApiActivity>>({
    url: `${type}/activity`,
    method: 'GET',
    headers: {
      Prefer: `code=200, example=${accountId}`,
    },
    ...config?.abortSignal && {
      signal: config.abortSignal,
    },
  });

  return data.map((apiActivity: ApiActivity) => activityMapper(apiActivity));
}
