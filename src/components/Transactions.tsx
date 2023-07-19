import { useState } from 'react';

import { MTabContent, MTabs, TabOption } from '@modyo-dynamic/modyo-design-system-react';

import { useTranslation } from 'react-i18next';
import { Product } from '@modyo-dynamic/modyo-service-retail';
import TransactionsList from './TransactionsList';
import TransactionsListScheduled from './TransactionsListScheduled';
import TransactionsListLoader from './loaders/TransactionsListLoader';

type Props = {
  loading: boolean;
  product?: Product;
};

export default function Transactions({ loading, product }: Props) {
  const { t } = useTranslation();

  const options: TabOption[] = [
    { label: t('tabs.transactions'), tab: 'transactions' },
    { label: t('tabs.upcoming'), tab: 'upcoming' },
  ];
  const [selected, setSelected] = useState(options[0]);

  const handlerSelected = (option: TabOption) => {
    setSelected(option);
  };

  if (loading) {
    return (
      <div className="bg-white rounded p-3 pt-5">
        <br />
        <TransactionsListLoader />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="d-block py-0 px-3 w-100 bg-white rounded">
      <MTabs
        options={options}
        defaultSelected={selected.tab}
        onChange={handlerSelected}
      >
        <MTabContent tab={options[0].tab}>
          <TransactionsList loading={loading} product={product} />
        </MTabContent>
        <MTabContent tab={options[1].tab}>
          <TransactionsListScheduled loading={loading} product={product} />
        </MTabContent>
      </MTabs>
    </div>
  );
}
