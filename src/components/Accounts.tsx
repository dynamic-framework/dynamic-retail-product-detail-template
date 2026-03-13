import { DBox, useMediaBreakpointUpMd } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';

import AccountDetail from './AccountDetail';
import AccountSelectorPicker from './AccountSelectorPicker';
import AccountSelectorSlider from './AccountSelectorSlider';

export default function Accounts() {
  const isMobile = useMediaBreakpointUpMd(true);
  return (
    <DBox
      className={classNames(
        SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) ? 'gap-0' : 'gap-4',
        'custom-details',
      )}
    >
      {!isMobile || !SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER)
        ? <AccountSelectorPicker /> : <AccountSelectorSlider />}
      <div className="">
        <AccountDetail />
      </div>
    </DBox>
  );
}
