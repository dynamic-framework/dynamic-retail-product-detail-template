import {
  DBadge,
  DIcon,
  DListGroupItem,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import {
  CHECKBOOK_ITEM_PATH,
  FORMAT_DATE,
  SITE_URL,
} from '../config/widgetConfig';

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
  const { t } = useTranslation();

  return (
    <DListGroupItem
      href={`${SITE_URL}/${CHECKBOOK_ITEM_PATH}?id=${id}`}
      className="hover:bg-gray-25"
    >
      <div className="flex-1">
        <p className="fw-semibold mb-0">
          {t('checkbooks.title', { id })}
        </p>
        <small className="d-block text-gray-500">
          {DateTime.fromISO(date).toFormat(FORMAT_DATE)}
        </small>
      </div>
      <DBadge
        soft
        color={active ? 'success' : 'danger'}
        text={t(active ? 'active' : 'inactive')}
      />
      <DIcon
        icon="ChevronRight"
        size="1rem"
        color="primary"
      />
    </DListGroupItem>
  );
}
