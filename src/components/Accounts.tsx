import classNames from 'classnames';
import { MCard } from '@dynamic-framework/ui-react';
import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';
import AccountSlider from './AccountSlider';
import AccountSelector from './AccountSelector';
import AccountDetail from './AccountDetail';

export default function Accounts() {
  return (
    <MCard
      className={classNames(
        'bg-indigo-100 p-3 custom-details',
        'border-0 shadow-none',
        SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) ? 'gap-0' : 'gap-3',
      )}
    >
      {!SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
        <AccountSelector />
      )}
      <MCard className="shadow-none border-0">
        {SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
          <AccountSlider />
        )}
        <AccountDetail />
      </MCard>
    </MCard>
  );
}
