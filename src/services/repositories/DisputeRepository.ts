import { ApiDispute, ApiResponseWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { AccountTypeConfig } from '../config';
import { Account } from '../interface';
import disputeMapper from '../mappers/disputeMapper';
import metadataMapper from '../mappers/metadataMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams<{
  account: Account;
  page: string;
  query?: string,
}>) {
  const group = params.account.baseType.toUpperCase();
  const type = AccountTypeConfig[params.account.type].apiType;

  const { data } = await ApiClient.request<ApiResponseWrapped<ApiDispute[]>>(
    {
      url: `accounts/${group}/${type}/account/disputes`,
      method: 'GET',
      signal: params.config?.abortSignal,
      params: {
        ...params.query && { query: params.query },
        page: params.page,
      },
    },
  );

  return {
    data: data.content.map(disputeMapper),
    metadata: metadataMapper(data.metadata!),
  };
}
