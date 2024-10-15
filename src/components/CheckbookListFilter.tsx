import { DButton, DInputSearch, useDPortalContext } from '@dynamic-framework/ui-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useDebounce from '../hooks/useDebounce';
import { useAppDispatch } from '../store/hooks';
import { setQueryFilterCheckbook } from '../store/slice';

export default function CheckbookListFilter() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext();

  const [inputValue, setInputValue] = useState('');

  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setQueryFilterCheckbook(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <>
      <div className="d-flex d-lg-none align-items-center pb-2 ps-1">
        <p className="text-gray-600 mb-0">{t('filters.filterBy')}</p>
      </div>
      <div className="d-flex align-items-stretch gap-6 mb-4">
        <DInputSearch
          value={inputValue}
          placeholder={t('search')}
          onChange={(e) => setInputValue(e)}
        />
        <DButton
          iconStart="funnel"
          className="px-4"
          variant="outline"
          text={t('filters.title')}
          onClick={() => openPortal('offcanvasCheckbooksFilters', undefined)}
        />
      </div>
    </>
  );
}
