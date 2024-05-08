import type { GenericAbortSignal } from 'axios';

import type { ApiAccount } from '../api-interface';
import ApiClient from '../clients/apiClient';
import {
  AccountBaseType,
  AccountType,
  AccountTypeConfig,
  ApiAccountTypeConfig,
} from '../config';
import accountMapper from '../mappers/accountMapper';

export async function list(
  accountType: AccountType,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Array<ApiAccount>>({
    url: 'accounts',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: `code=200, example=${AccountTypeConfig[accountType].apiType}`,
    },
  });

  return data
    // we make sure to only use accounts we can handle
    .filter((apiAccount: ApiAccount) => (
      Object.keys(ApiAccountTypeConfig).includes(apiAccount.accountType)
    ))
    // and we transform the account into the type of account that the widge uses
    .map((apiAccount: ApiAccount) => accountMapper(apiAccount));
}

export async function get(
  type: AccountBaseType,
  accountId: string,
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiAccount>({
    url: `/${type}/account`,
    method: 'GET',
    headers: {
      Prefer: `code=200, example=${accountId}`,
    },
    ...config?.abortSignal && {
      signal: config.abortSignal,
    },
  });

  return accountMapper(data);
}
