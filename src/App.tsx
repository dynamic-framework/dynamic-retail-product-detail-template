import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';
import ActivityContainer from './components/ActivityContainer';
import useAccountsEffect from './services/hooks/useAccountsEffect';
import useAccountEffect from './services/hooks/useAccountEffect';
import Accounts from './components/Accounts';
import { SITE_LANG, VARS_CURRENCY } from './config/widgetConfig';

export default function App() {
  const { setContext } = useDContext();

  useEffect(() => {
    setContext({
      language: SITE_LANG,
      currency: VARS_CURRENCY,
    });
  }, [setContext]);

  useAccountsEffect();
  useAccountEffect();

  return (
    <div className="row">
      <div className="col-12 col-lg-5 col-xl-4 order-1 mb-4 mb-lg-0">
        <Accounts />
      </div>
      <div className="col-12 col-lg-7 col-xl-8 h-100 order-2">
        <ActivityContainer />
      </div>
    </div>
  );
}
