import classNames from 'classnames';

import ActivityContainer from './components/ActivityContainer';
import AccountDetail from './components/AccountDetail';
import AccountSelector from './components/AccountSelector';
import useAccountsEffect from './services/hooks/useAccountsEffect';
import SelectedAccountName from './components/SelectedAccountName';
import useAccountEffect from './services/hooks/useAccountEffect';

export default function App() {
  useAccountsEffect();
  useAccountEffect();

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12">
          <SelectedAccountName />
        </div>
        <div className="col-12 col-lg-7 col-xl-8 h-100 order-2 order-lg-1">
          <ActivityContainer />
        </div>
        <div className="col-12 col-lg-5 col-xl-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <div
            className={classNames(
              'bg-indigo-100 rounded p-3 custom-details',
              'd-flex flex-column gap-4',
            )}
          >
            <AccountSelector />
            <AccountDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
