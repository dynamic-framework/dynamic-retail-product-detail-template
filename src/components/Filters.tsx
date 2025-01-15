import {
  DButton,
  DInputSearch,
  useDPortalContext,
  useMediaBreakpointUpMd,
} from '@dynamic-framework/ui-react';
import {
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import useDebounce from '../hooks/useDebounce';
import { useAppDispatch } from '../store/hooks';
import { setQueryFilter } from '../store/slice';

type Prop = {
  disabled: boolean,
  offcanvasName: string;
  otherOptions?: ReactNode;
};

export default function Filters(
  {
    disabled,
    offcanvasName,
    otherOptions,
  }: Prop,
) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext();
  const md = useMediaBreakpointUpMd(true);

  const [inputValue, setInputValue] = useState('');

  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setQueryFilter(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <>
      <div className="d-flex d-lg-none align-items-center pb-2 ps-1">
        <p className="text-gray-600 mb-0">{t('filters.filterBy')}</p>
      </div>
      <div className="d-flex align-items-center gap-6 mb-4">
        <DInputSearch
          id="inputSearch"
          value={inputValue}
          disabled={disabled}
          placeholder={t('filters.search')}
          onChange={(e) => setInputValue(e)}
          className="col col-lg-4"
        />
        <DButton
          variant="outline"
          iconStart="funnel"
          text={md ? t('filter.title') : ''}
          className="px-4"
          onClick={() => openPortal(offcanvasName, undefined)}
          disabled={disabled}
        />
        {otherOptions}
      </div>
    </>
  );
}
