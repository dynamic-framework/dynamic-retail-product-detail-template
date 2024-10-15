import { DList } from '@dynamic-framework/ui-react';

import useCheckbooksCallback from '../services/hooks/useCheckbooksCallback';

import CheckbookItem from './CheckbookItem';
import CheckbookListFilter from './CheckbookListFilter';
import CheckbookLoader from './loaders/CheckbookLoader';

export default function Checkbooks() {
  const { data: options, loading } = useCheckbooksCallback();

  return (
    <div>
      <div className="d-flex gap-2 mb-8">
        <CheckbookListFilter />
      </div>
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
    </div>
  );
}
