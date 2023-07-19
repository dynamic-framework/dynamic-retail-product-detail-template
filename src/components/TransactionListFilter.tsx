import {
  MButton,
  MInputSearch,
  useOffcanvasContext,
} from '@modyo-dynamic/modyo-design-system-react';
import { Transaction } from '@modyo-dynamic/modyo-service-retail';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getFilterTransactions } from '../store/selectors';
import { setQueryFilterTransaction } from '../store/slice';

type Prop = {
  transactions: Transaction[],
};

export function TransactionListFilter({ transactions }: Prop) {
  const { query } = useAppSelector(getFilterTransactions);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { openOffcanvas } = useOffcanvasContext();

  const inputSearchHandler = ({ detail }: CustomEvent) => {
    dispatch(setQueryFilterTransaction(detail as string));
  };

  return (
    <>
      <div className="d-flex d-lg-none align-items-center pb-2 ps-1">
        <p className="text-gray-600">{t('filters.filterBy')}</p>
      </div>
      <div className="d-flex align-items-stretch gap-4">
        <div className="d-none d-lg-flex align-items-center">
          <p className="text-gray-600">{t('filters.filterBy')}</p>
        </div>
        <MInputSearch
          mId="inputSearch"
          value={query}
          isDisabled={!transactions.length}
          placeholder={t('filters.search')}
          onMChange={(e: CustomEvent) => inputSearchHandler(e)}
        />
        <MButton
          className="btn-filters d-grid"
          theme="secondary"
          variant="outline"
          iconEnd="filter"
          onMClick={() => openOffcanvas('advancedFilters')}
        />
      </div>
    </>
  );
}
