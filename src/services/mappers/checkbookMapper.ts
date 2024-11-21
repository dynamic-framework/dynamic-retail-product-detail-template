import type { ApiCheckbook } from '../api-interface';
import type { Checkbook } from '../interface';

export default function checkbookMapper(ApiCheckbook: ApiCheckbook): Checkbook {
  return {
    id: ApiCheckbook.id,
    date: ApiCheckbook.date,
    active: ApiCheckbook.active,
  };
}
