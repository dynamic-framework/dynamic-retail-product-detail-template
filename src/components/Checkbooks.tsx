import { DButton, DList, useDPortalContext } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import CheckbookItem from './CheckbookItem';
import SearchBarCheckbooks from './SearchBarCheckbooks';

const options = [{
  id: '19846720124',
  date: '12/12/2020',
  active: false,
},
{
  id: '19846720125',
  date: '12/12/2021',
  active: true,
},
{
  id: '19846720126',
  date: '12/12/2022',
  active: false,
}];

export default function Checkbooks() {
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext();
  return (
    <div>
      <div className="d-flex gap-2 mb-8">
        <SearchBarCheckbooks />
        <DButton
          iconStart="funnel"
          variant="outline"
          text={t('filters.title')}
          onClick={() => openPortal('offcanvasAdvancedFilters', undefined)}
        />
      </div>
      <DList flush>
        {options.map((option) => (
          <CheckbookItem
            key={option.id}
            id={option.id}
            date={option.date}
            active={option.active}
          />
        ))}
      </DList>
    </div>
  );
}
