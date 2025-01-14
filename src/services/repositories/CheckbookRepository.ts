import { ApiCheckbook, ApiResponseWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import checkbookMapper from '../mappers/checkbookMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams<{
  query?: string,
}>) {
  const { data } = await ApiClient.request<ApiResponseWrapped<ApiCheckbook[]>>(
    {
      url: 'accounts/account/checkbooks',
      method: 'GET',
      params: {
        query: params.query,
      },
      signal: params.config?.abortSignal,
    },
  );

  const { content, metadata } = data;

  return {
    content: content.map(checkbookMapper),
    metadata,
  };
}
