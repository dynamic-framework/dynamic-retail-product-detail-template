import type { ApiMetadata } from '../api-interface';
import { Metadata } from '../interface';

export default function metadataMapper(apiMetadata: ApiMetadata): Metadata {
  return {
    page: apiMetadata.page,
    totalPages: apiMetadata.total_pages,
  };
}
