import ActivityContainer from './components/ActivityContainer';
import useAccountsEffect from './services/hooks/useAccountsEffect';
import SelectedAccountName from './components/SelectedAccountName';
import useAccountEffect from './services/hooks/useAccountEffect';
import Accounts from './components/Accounts';

export default function App() {
  useAccountsEffect();
  useAccountEffect();

  return (
    <div className="row">
      <div className="col-12 order-1">
        <SelectedAccountName />
      </div>
      <div className="col-12 col-lg-5 col-xl-4 order-2 mb-3 mb-lg-0">
        <Accounts />
      </div>
      <div className="col-12 col-lg-7 col-xl-8 h-100 order-3">
        <ActivityContainer />
      </div>
    </div>
  );
}
