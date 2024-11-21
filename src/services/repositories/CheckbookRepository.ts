import type { GenericAbortSignal } from 'axios';

import { ApiCheckbook, ApiResponsePaginatedWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import checkbookMapper from '../mappers/checkbookMapper';

export async function list(
  query: string,
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiResponsePaginatedWrapped<ApiCheckbook>>({
    url: `checkbooks/${query}`,
    method: 'GET',
    headers: {
      Prefer: 'code=200',
    },
    ...config?.abortSignal && {
      signal: config.abortSignal,
    },
  });

  const { content, metadata } = data;

  return {
    content: content.map(checkbookMapper),
    metadata,
  };
}
