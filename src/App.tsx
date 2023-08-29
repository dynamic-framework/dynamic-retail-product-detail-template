import classNames from 'classnames';

import ActivityContainer from './components/ActivityContainer';
import AccountDetail from './components/AccountDetail';
import AccountSelector from './components/AccountSelector';
import useAccountsEffect from './services/hooks/useAccountsEffect';
import SelectedAccountName from './components/SelectedAccountName';
import useAccountEffect from './services/hooks/useAccountEffect';
import { API_ACCOUNT_LIST_FILTER, SLIDE_VIEWS } from './config/widgetConfig';
import AccountSlider from './components/AccountSlider';

export default function App() {
  useAccountsEffect();
  useAccountEffect();

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12 order-1">
          <SelectedAccountName />
        </div>
        <div className="col-12 col-lg-5 col-xl-4 order-2 mb-3 mb-lg-0">
          <div
            className={classNames(
              'bg-indigo-100 rounded p-3 custom-details',
              'd-flex flex-column gap-4',
            )}
          >
            {SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
              <AccountSlider />
            )}
            {!SLIDE_VIEWS.includes(API_ACCOUNT_LIST_FILTER) && (
              <AccountSelector />
            )}
            <AccountDetail />
          </div>
        </div>
        <div className="col-12 col-lg-7 col-xl-8 h-100 order-3">
          <ActivityContainer />
        </div>
      </div>
    </div>
  );
}
