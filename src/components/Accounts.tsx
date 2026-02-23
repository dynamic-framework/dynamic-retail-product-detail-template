import { DBox, useMediaBreakpointUpSm } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';

import AccountDetail from './AccountDetail';
import AccountSelectorPicker from './AccountSelectorPicker';
import AccountSelectorSlider from './AccountSelectorSlider';

export default function Accounts() {
  const isMobile = useMediaBreakpointUpSm(true);
  return (
    <DBox
      className={classNames(
        SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) ? 'gap-0' : 'gap-4',
        'custom-details p-4 p-md-8',
      )}
    >
      {!isMobile ? <AccountSelectorPicker /> : <AccountSelectorSlider />}
      <div className="">
        <AccountDetail />
      </div>
    </DBox>
  );
}
