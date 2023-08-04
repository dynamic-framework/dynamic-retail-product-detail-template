import { useMemo, useState } from 'react';
import { MTabContent, MTabs, TabOption } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import ActivityList from './ActivityList';
import ActivityListScheduled from './ActivityListScheduled';
import AccountListLoader from './loaders/AccountListLoader';
import { useAppSelector } from '../store/hooks';
import { getIsLoadingAccounts, getSelectedAccount } from '../store/selectors';

export default function ActivityContainer() {
  const { t } = useTranslation();
  const isLoading = useAppSelector(getIsLoadingAccounts);

  const options: TabOption[] = useMemo(() => [
    { label: t('tabs.transactions'), tab: 'transactions' },
    { label: t('tabs.upcoming'), tab: 'upcoming' },
  ], [t]);

  const [container, setContainer] = useState(options[0]);

  const handlerSelected = (option: TabOption) => {
    setContainer(option);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded p-3 pt-5">
        <br />
        <AccountListLoader />
      </div>
    );
  }

  return (
    <div className="d-block py-0 px-3 w-100 bg-white rounded">
      <MTabs
        options={options}
        defaultSelected={container.tab}
        onChange={handlerSelected}
      >
        <MTabContent tab={options[0].tab}>
          <ActivityList />
        </MTabContent>
        <MTabContent tab={options[1].tab}>
          <ActivityListScheduled />
        </MTabContent>
      </MTabs>
    </div>
  );
}
