import classNames from 'classnames';
import { DCard } from '@dynamic-framework/ui-react';

import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';
import AccountSelectorSlider from './AccountSelectorSlider';
import AccountSelectorPicker from './AccountSelectorPicker';
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
        <AccountSelectorPicker />
      )}
      <DCard className="shadow-none border-0">
        {SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
          <AccountSelectorSlider />
        )}
        <AccountDetail />
      </DCard>
    </DCard>
  );
}
