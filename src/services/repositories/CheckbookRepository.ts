import { ApiCheckbook, ApiResponseWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import checkbookMapper from '../mappers/checkbookMapper';
import metadataMapper from '../mappers/metadataMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams<{
  page: string;
  query?: string,
}>) {
  const { data } = await ApiClient.request<ApiResponseWrapped<ApiCheckbook[]>>(
    {
      url: 'accounts/account/checkbooks',
      method: 'GET',
      params: {
        ...params.query && { query: params.query },
        page: params.page,
      },
      signal: params.config?.abortSignal,
    },
  );

  return {
    data: data.content.map(checkbookMapper),
    metadata: metadataMapper(data.metadata!),
  };
}
