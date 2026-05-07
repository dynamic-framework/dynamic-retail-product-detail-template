import { useDContext, DLayout } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';

import Accounts from './components/Accounts';
import TabsContainer from './components/TabsContainer';
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
    <div className="container">
      <DLayout>
        <DLayout.Pane
          cols={12}
          colsLg={4}
        >
          <Accounts />
        </DLayout.Pane>
        <DLayout.Pane
          cols={12}
          colsLg={8}
        >
          <TabsContainer />
        </DLayout.Pane>
      </DLayout>
    </div>
  );
}
