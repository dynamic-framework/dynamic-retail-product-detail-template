import {
  DButtonIcon,
  DInput,
  useDPortalContext,
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

  const [inputValue, setInputValue] = useState('');

  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setQueryFilter(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <div className="d-flex align-items-center gap-4 mb-4">
      <DInput
        id="inputSearch"
        iconStartAriaLabel="Search"
        value={inputValue}
        disabled={disabled}
        placeholder={t('filters.search')}
        iconStart="Search"
        onChange={(e) => setInputValue(e)}
        className="col col-lg-4"
      />
      <DButtonIcon
        aria-label={t('filters.filters')}
        variant="outline"
        icon="SlidersHorizontal"
        onClick={() => openPortal(offcanvasName, {})}
        disabled={disabled}
      />
      {otherOptions}
    </div>
  );
}
