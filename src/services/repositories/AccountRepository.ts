import type { ApiAccount, ApiResponseWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import {
  AccountTypeConfig,
  ApiAccountType,
  ApiAccountTypeConfig,
} from '../config';
import { Account } from '../interface';
import accountMapper from '../mappers/accountMapper';

import { RepositoryParams } from './repository';

export async function list(
  params: RepositoryParams<{
    apiAccountType: ApiAccountType;
  }>,
) {
  const { data } = await ApiClient.request<ApiResponseWrapped<ApiAccount[]>>(
    {
      url: 'accounts',
      method: 'GET',
      signal: params.config?.abortSignal,
    },
  );

  return data.content
    // we make sure to only use accounts we can handle
    .filter((apiAccount: ApiAccount) => (
      Object.keys(ApiAccountTypeConfig).includes(apiAccount.group)
    ))
    .filter((apiAccount: ApiAccount) => (
      apiAccount.group === params.apiAccountType
    ))
    // and we transform the account into the type of account that the widget uses
    .map(accountMapper);
}

export async function get(
  params: RepositoryParams<{
    account: Account,
  }>,
) {
  const group = params.account.baseType.toUpperCase();
  const type = AccountTypeConfig[params.account.type].apiType;

  const { data } = await ApiClient.request<ApiResponseWrapped<ApiAccount>>(
    {
      url: `accounts/${group}/${type}/account`,
      method: 'GET',
      signal: params.config?.abortSignal,
    },
  );

  return accountMapper(data.content);
}

export async function freezeCard(params: RepositoryParams) {
  await ApiClient.request(
    {
      url: 'generics',
      method: 'POST',
      signal: params.config?.abortSignal,
    },
  );
}
