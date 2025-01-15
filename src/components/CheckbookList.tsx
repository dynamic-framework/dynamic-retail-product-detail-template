import { DList, DPaginator } from '@dynamic-framework/ui-react';

import useSelectedPage from '../hooks/useSelectedPage';
import useCheckbooksEffect from '../services/hooks/useCheckbooksEffect';
import { useAppSelector } from '../store/hooks';
import { getMetadata } from '../store/selectors';

import CheckbookItem from './CheckbookItem';
import Filters from './Filters';
import CheckbookLoader from './loaders/CheckbookLoader';

export default function CheckbookList() {
  const { checkbooks, loading } = useCheckbooksEffect();
  const { selectedPageHandler } = useSelectedPage();
  const metadata = useAppSelector(getMetadata);

  return (
    <>
      <Filters
        disabled={checkbooks.length === 0}
        offcanvasName="offcanvasCheckbooksFilters"
      />
      {loading && <CheckbookLoader />}
      {!loading && (
        <>
          <DList flush>
            {checkbooks?.map((option) => (
              <CheckbookItem
                key={option.id}
                id={option.id}
                date={option.date}
                active={option.active}
              />
            ))}
          </DList>
          <div className="d-flex flex-grow-1 justify-content-center py-4">
            <DPaginator
              page={metadata.page}
              total={metadata.totalPages}
              onPageChange={selectedPageHandler}
            />
          </div>
        </>
      )}
    </>
  );
}
