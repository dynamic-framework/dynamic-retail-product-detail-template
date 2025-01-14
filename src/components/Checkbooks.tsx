import { DList, DPaginator } from '@dynamic-framework/ui-react';

import useSelectedPage from '../hooks/useSelectedPage';
import useCheckbooksEffect from '../services/hooks/useCheckbooksEffect';
import { useAppSelector } from '../store/hooks';
import { getMetadata } from '../store/selectors';

import CheckbookItem from './CheckbookItem';
import CheckbookListFilter from './CheckbookListFilter';
import CheckbookLoader from './loaders/CheckbookLoader';

export default function Checkbooks() {
  const { data: options, loading } = useCheckbooksEffect();
  const { selectedPageHandler } = useSelectedPage();
  const metadata = useAppSelector(getMetadata);

  return (
    <>
      <CheckbookListFilter />
      {loading && <CheckbookLoader />}
      {!loading && (
        <>
          <DList flush>
            {options?.map((option) => (
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
