import { DInputSearch } from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// import useDebounce from '../hooks/useDebounce';
// import { useAppDispatch } from '../store/hooks';

export default function SearchBarCheckbooks() {
  // const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState('');

  // const debouncedQuery = useDebounce(inputValue, 300);

  return (
    <DInputSearch
      value={inputValue}
      placeholder={t('search')}
      onChange={(e) => setInputValue(e)}
    />
  );
}
