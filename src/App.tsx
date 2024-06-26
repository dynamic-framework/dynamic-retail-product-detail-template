import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';

import Accounts from './components/Accounts';
import ActivityContainer from './components/ActivityContainer';
import { CONTEXT_CONFIG } from './config/widgetConfig';
import useAccountEffect from './services/hooks/useAccountEffect';
import useAccountsEffect from './services/hooks/useAccountsEffect';

export default function App() {
  const { setContext } = useDContext();

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
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
