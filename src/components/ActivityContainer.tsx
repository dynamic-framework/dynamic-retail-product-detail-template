import { DTabContent, DTabs, DTabOption } from '@dynamic-framework/ui-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../store/hooks';
import { getIsNotReady } from '../store/selectors';

import ActivityList from './ActivityList';
import ActivityListScheduled from './ActivityListScheduled';
import AccountListLoader from './loaders/AccountListLoader';

export default function ActivityContainer() {
  const { t } = useTranslation();
  const isNotReady = useAppSelector(getIsNotReady);

  const options: DTabOption[] = useMemo(() => [
    { label: t('tabs.transactions'), tab: 'transactions' },
    { label: t('tabs.upcoming'), tab: 'upcoming' },
  ], [t]);

  const [container, setContainer] = useState(options[0]);

  const handlerSelected = (option: DTabOption) => {
    setContainer(option);
  };

  if (isNotReady) {
    return (
      <div className="bg-white rounded p-4 pt-8">
        <br />
        <AccountListLoader />
      </div>
    );
  }

  return (
    <div className="d-block py-0 px-4 w-100 bg-white rounded">
      <DTabs
        options={options}
        defaultSelected={container.tab}
        onChange={handlerSelected}
      >
        <DTabContent tab={options[0].tab}>
          <ActivityList />
        </DTabContent>
        <DTabContent tab={options[1].tab}>
          <ActivityListScheduled />
        </DTabContent>
      </DTabs>
    </div>
  );
}
