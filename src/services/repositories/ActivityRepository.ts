import type { GenericAbortSignal } from 'axios';

import { ApiActivity } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { AccountBaseType } from '../config';
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
