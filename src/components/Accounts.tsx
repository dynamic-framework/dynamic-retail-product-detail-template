import { DCard } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';

import AccountDetail from './AccountDetail';
import AccountSelectorPicker from './AccountSelectorPicker';
import AccountSelectorSlider from './AccountSelectorSlider';

export default function Accounts() {
  return (
    <DCard
      className={classNames(
        'custom-details',
        'border-0 shadow-none',
        SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) ? 'gap-0' : 'gap-4',
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
