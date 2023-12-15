import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {
  DContextProvider,
  DModalContextProvider,
  DOffcanvasContextProvider,
} from '@dynamic-framework/ui-react';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ActivityDetailModal from './components/ActivityDetailModal';
import OffcanvasAdvancedFilters from './components/OffcanvasAdvancedFilters';
import { SITE_LANG, VARS_CURRENCY } from './config/widgetConfig';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';
import type { ModalAvailablePayload } from './interface';

const root = ReactDOM.createRoot(document.getElementById('accountDetails') as Element);
root.render(
  <StrictMode>
    <DContextProvider
      language={SITE_LANG}
      currency={VARS_CURRENCY}
    >
      <Provider store={store}>
        <DOffcanvasContextProvider
          portalName="offcanvasPortal"
          availableOffcanvas={{
            advancedFilters: OffcanvasAdvancedFilters,
          }}
        >
          <DModalContextProvider<ModalAvailablePayload>
            portalName="modalPortal"
            availableModals={{
              activityDetail: ActivityDetailModal,
            }}
          >
            <App />
          </DModalContextProvider>
        </DOffcanvasContextProvider>
      </Provider>
    </DContextProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
