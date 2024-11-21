import { DList } from '@dynamic-framework/ui-react';

import useCheckbooksEffect from '../services/hooks/useCheckbooksEffect';

import CheckbookItem from './CheckbookItem';
import CheckbookListFilter from './CheckbookListFilter';
import CheckbookLoader from './loaders/CheckbookLoader';

export default function Checkbooks() {
  const { data: options, loading } = useCheckbooksEffect();

  return (
    <>
      <CheckbookListFilter />
      {loading && <CheckbookLoader />}
      {!loading && (
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
      )}
    </>
  );
}
