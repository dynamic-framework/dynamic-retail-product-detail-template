import { DIcon } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { NEW_DISPUTE_PATH, SITE_URL } from '../config/widgetConfig';
import { Account } from '../services/interface';

type Props = {
  account: Account;
};

export default function NewDisputeLink({ account }: Props) {
  const { t } = useTranslation();

  return (
    <a
      href={`${SITE_URL}/${NEW_DISPUTE_PATH}?account_id=${account.id}`}
      className="ms-lg-auto btn btn-primary text-nowrap col"
    >
      <DIcon icon="plus" />
      {t('button.newDispute')}
    </a>
  );
}
