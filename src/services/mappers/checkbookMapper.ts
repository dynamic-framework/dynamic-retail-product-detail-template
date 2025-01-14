import type { ApiCheckbook } from '../api-interface';
import type { Checkbook } from '../interface';

export default function checkbookMapper(ApiCheckbook: ApiCheckbook): Checkbook {
  return {
    id: ApiCheckbook.serial_number,
    date: ApiCheckbook.issue_date,
    active: ApiCheckbook.is_active,
  };
}
