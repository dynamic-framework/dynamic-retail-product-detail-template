import classNames from 'classnames';
import { DCard } from '@dynamic-framework/ui-react';

import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';
import AccountSlider from './AccountSlider';
import AccountSelector from './AccountSelector';
import AccountDetail from './AccountDetail';

export default function Accounts() {
  return (
    <DCard
      className={classNames(
        'custom-details',
        'border-0 shadow-none',
        SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) ? 'gap-0' : 'gap-3',
      )}
    >
      {!SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
        <AccountSelector />
      )}
      <DCard className="shadow-none border-0">
        {SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
          <AccountSlider />
        )}
        <AccountDetail />
      </DCard>
    </DCard>
  );
}
