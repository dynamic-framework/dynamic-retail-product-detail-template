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
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-5 col-xl-4 mb-4 mb-lg-0">
          <Accounts />
        </div>
        <div className="col-12 col-lg-7 col-xl-8 h-100">
          <ActivityContainer />
        </div>
      </div>
    </div>
  );
}
