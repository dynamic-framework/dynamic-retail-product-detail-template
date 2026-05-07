import { DBox } from '@dynamic-framework/ui-react';

import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';

import AccountDetail from './AccountDetail';
import AccountSelectorPicker from './AccountSelectorPicker';
import AccountSelectorSlider from './AccountSelectorSlider';

export default function Accounts() {
  return (
    <DBox
      className="p-4 p-md-8 d-flex flex-column gap-4 custom-details"
    >
      {!SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
        <AccountSelectorPicker />
      )}
      <div className="">
        {SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
          <AccountSelectorSlider />
        )}
        <AccountDetail />
      </div>
    </DBox>
  );
}
