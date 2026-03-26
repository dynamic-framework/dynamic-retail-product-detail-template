import { DBox, useMediaBreakpointUpMd } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from '../config/widgetConfig';

import AccountDetail from './AccountDetail';
import AccountSelectorPicker from './AccountSelectorPicker';
import AccountSelectorResponsive from './AccountSelectorResponsive';
import AccountSelectorSlider from './AccountSelectorSlider';

export default function Accounts() {
  const isDesktop = useMediaBreakpointUpMd(true);
  return (
    <DBox
      className={classNames(
        SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) ? 'gap-0' : 'gap-4',
        'custom-details',
      )}
    >
      {(isDesktop && !SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER)) && <AccountSelectorPicker />}
      {isDesktop && SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && <AccountSelectorSlider />}
      {!isDesktop && SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && <AccountSelectorResponsive />}
      <div className="">
        <AccountDetail />
      </div>
    </DBox>
  );
}
