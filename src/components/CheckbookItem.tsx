import { DBadge, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
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
      className={classNames(
        'list-group-item list-group-item-action',
        'd-flex py-2 px-lg-4 gap-4 align-items-center border-light',
      )}
    >
      <div className="flex-1">
        Checkkbok:
        {' '}
        {id}
        <small className="d-block text-gray-500">
          {DateTime.fromISO(date).toFormat(FORMAT_DATE)}
        </small>
      </div>
      <DBadge
        soft
        theme={active ? 'success' : 'danger'}
        text={active ? 'Active' : 'Inactive'}
      />
      <DIcon
        icon="chevron-right"
        size="16px"
        theme="primary"
      />
    </a>
  );
}
