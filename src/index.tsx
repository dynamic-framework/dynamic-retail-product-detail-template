import { DContextProvider } from '@dynamic-framework/ui-react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import ModalActivityDetail from './components/modals/ModalActivityDetail';
import ModalCardInformation from './components/modals/ModalCardInformation';
import ModalDisputeDetail from './components/modals/modalDisputeDetail';
import ModalMoreActions from './components/modals/ModalMoreActions';
import ModalOtp from './components/modals/ModalOtp';
import OffcanvasAdvancedFilters from './components/offcanvas/OffcanvasAdvancedFilters';
import OffcanvasCheckbooksFilters from './components/offcanvas/OffcanvasCheckbooksFilters';
import type { PortalAvailablePayload } from './interface';
import store from './store/store';

// import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

const root = ReactDOM.createRoot(document.getElementById('accountDetails') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <DContextProvider<PortalAvailablePayload>
        portalName="portal"
        availablePortals={{
          modalOtp: ModalOtp,
          modalCardInformation: ModalCardInformation,
          modalDisputeDetail: ModalDisputeDetail,
          modalActivityDetail: ModalActivityDetail,
          offcanvasAdvancedFilters: OffcanvasAdvancedFilters,
          offcanvasCheckbooksFilters: OffcanvasCheckbooksFilters,
          modalMoreActions: ModalMoreActions,
        }}
      >
        <App />
      </DContextProvider>
    </Provider>
  </StrictMode>,
);
