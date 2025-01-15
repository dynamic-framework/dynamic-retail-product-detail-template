import {
  DTabs,
  DTabOption,
  DCard,
} from '@dynamic-framework/ui-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';
import useSelectedPage from '../hooks/useSelectedPage';
import { useAppSelector } from '../store/hooks';
import { getIsNotReady } from '../store/selectors';

import ActivityList from './ActivityList';
import CheckbookList from './CheckbookList';
import DisputeList from './DisputeList';
import ListLoader from './loaders/ListLoader';

const IS_LOAN = API_ACCOUNT_LIST_FILTER === 'loan';
const IS_CHECKING = API_ACCOUNT_LIST_FILTER === 'checking';

export default function TabsContainer() {
  const { t } = useTranslation();
  const isNotReady = useAppSelector(getIsNotReady);
  const { selectedPageHandler } = useSelectedPage();

  const options: DTabOption[] = useMemo(() => [
    { label: t('tabs.transactions'), tab: 'transactions' },
    { label: t('tabs.upcoming'), tab: 'upcoming' },
    { label: t('tabs.disputes'), tab: 'disputes' },
    { label: t('tabs.checkbooks'), tab: 'checkbooks' },
  ], [t]);

  const filteredOptions = useMemo(() => {
    if (IS_LOAN) {
      return options.filter(({ tab }) => tab !== 'disputes' && tab !== 'checkbooks');
    }
    if (!IS_CHECKING) {
      return options.filter(({ tab }) => tab !== 'checkbooks');
    }
    return options;
  }, [options]);

  const [container, setContainer] = useState(filteredOptions[0]);

  const handlerSelected = (option: DTabOption) => {
    setContainer(option);
    selectedPageHandler(1);
  };

  return (
    <DCard>
      <DCard.Body>
        {isNotReady && <ListLoader />}
        {!isNotReady && (
          <DTabs
            options={filteredOptions}
            defaultSelected={container.tab}
            onChange={handlerSelected}
            className="px-0 pt-0 mb-4"
          >
            <DTabs.Tab tab={options[0].tab}>
              <ActivityList />
            </DTabs.Tab>
            <DTabs.Tab tab={options[1].tab}>
              <ActivityList scheduled />
            </DTabs.Tab>
            <DTabs.Tab tab={options[2].tab}>
              <DisputeList />
            </DTabs.Tab>
            <DTabs.Tab tab={options[3].tab}>
              <CheckbookList />
            </DTabs.Tab>
          </DTabs>
        )}
      </DCard.Body>
    </DCard>
  );
}
