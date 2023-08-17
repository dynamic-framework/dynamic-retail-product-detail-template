import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {
  LiquidContextProvider,
  ModalContextProvider,
  OffcanvasContextProvider,
} from '@dynamic-framework/ui-react';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui-all.css';

import './styles/base.scss';
import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalActivityDetail from './components/ModalActivityDetail';
import OffcanvasAdvancedFilters from './components/OffcanvasAdvancedFilters';

const root = ReactDOM.createRoot(document.getElementById('accountDetails') as Element);
root.render(
  <StrictMode>
    <LiquidContextProvider>
      <Provider store={store}>
        <OffcanvasContextProvider
          portalName="offcanvasPortal"
          availableOffcanvas={{
            advancedFilters: OffcanvasAdvancedFilters,
          }}
        >
          <ModalContextProvider
            portalName="modalPortal"
            availableModals={{
              activityDetail: ModalActivityDetail,
            }}
          >
            <App />
          </ModalContextProvider>
        </OffcanvasContextProvider>
      </Provider>
    </LiquidContextProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
