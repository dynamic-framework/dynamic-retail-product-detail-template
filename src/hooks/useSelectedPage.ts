import { changeQueryString } from '@dynamic-framework/ui-react';
import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSelectedPage } from '../store/selectors';
import { setSelectedPage } from '../store/slice';

export default function useSelectedPage() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(getSelectedPage);

  const selectedPageHandler = useCallback((newPage: number) => {
    dispatch(setSelectedPage(newPage.toString()));
  }, [dispatch]);

  useEffect(() => {
    changeQueryString(
      { page },
      { useSearch: true, pushState: true },
    );
  }, [page, dispatch]);

  return {
    selectedPageHandler,
  };
}
