import { DChip, DIcon } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';

import { FORMAT_DATE } from '../config/widgetConfig';

type Props = {
  id: string
  active: boolean
  date: string
};
export default function CheckbookItem({
  id,
  active,
  date,
}:
Props) {
  return (
    <a
      href={`/checkbook/${id}`}
      className="list-group-item list-group-item-action d-flex p-4 gap-8 align-items-center border-light"
    >
      <div className="flex-1">
        Checkkbok:
        {id}
        <small className="d-block text-gray-500">
          {DateTime.fromISO(date).toFormat(FORMAT_DATE)}
        </small>
      </div>
      <DChip
        theme={active ? 'success' : 'warning'}
        text={active ? 'Active' : 'Inactive'}
      />
      <DIcon icon="chevron-right" />
    </a>
  );
}
