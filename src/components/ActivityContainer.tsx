import {
  DTabContent,
  DTabs,
  DTabOption,
  DCard,
} from '@dynamic-framework/ui-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getIsNotReady } from '../store/selectors';

import ActivityList from './ActivityList';
import ActivityListScheduled from './ActivityListScheduled';
import Complains from './Complains';
import AccountListLoader from './loaders/AccountListLoader';

const isLoan = API_ACCOUNT_LIST_FILTER === 'loan';

export default function ActivityContainer() {
  const { t } = useTranslation();
  const isNotReady = useAppSelector(getIsNotReady);

  const options: DTabOption[] = useMemo(() => [
    { label: t('tabs.transactions'), tab: 'transactions' },
    { label: t('tabs.upcoming'), tab: 'upcoming' },
    { label: t('tabs.complains'), tab: 'complains' },
    { label: t('tabs.newTab'), tab: 'newTab' },
  ], [t]);

  const filteredOptions = useMemo(() => {
    if (isLoan) {
      return options.filter(({ tab }) => tab !== 'complains');
    }
    return options;
  }, [options]);

  const [container, setContainer] = useState(filteredOptions[0]);

  const handlerSelected = (option: DTabOption) => {
    setContainer(option);
  };

  if (isNotReady) {
    return (
      <DCard>
        <DCard.Body>
          <AccountListLoader />
        </DCard.Body>
      </DCard>
    );
  }

  return (
    <DCard>
      <DCard.Body>
        <DTabs
          options={filteredOptions}
          defaultSelected={container.tab}
          onChange={handlerSelected}
          className="px-0 pt-0"
        >
          <DTabContent tab={options[0].tab}>
            <ActivityList />
          </DTabContent>
          <DTabContent tab={options[1].tab}>
            <ActivityListScheduled />
          </DTabContent>
          <DTabContent tab={options[2].tab}>
            <Complains />
          </DTabContent>
          <DTabContent tab={options[3].tab}>
            <p>New tab</p>
          </DTabContent>
        </DTabs>
      </DCard.Body>
    </DCard>
  );
}
