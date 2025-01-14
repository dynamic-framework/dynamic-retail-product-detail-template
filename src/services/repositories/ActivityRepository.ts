import { ApiActivity, ApiResponseWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { AccountTypeConfig } from '../config';
import { Account } from '../interface';
import activityMapper from '../mappers/activityMapper';
import metadataMapper from '../mappers/metadataMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams<{
  account: Account;
  upcoming?: boolean;
  page: string;
}>) {
  const group = params.account.baseType.toUpperCase();
  const type = AccountTypeConfig[params.account.type].apiType;

  const { data } = await ApiClient.request<ApiResponseWrapped<ApiActivity[]>>(
    {
      url: `accounts/${group}/${type}/account/activity${params.upcoming ? '/upcoming' : ''}`,
      method: 'GET',
      signal: params.config?.abortSignal,
      params: {
        page: params.page,
      },
    },
  );

  return {
    data: data.content.map(activityMapper),
    metadata: metadataMapper(data.metadata!),
  };
}
