import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import '@modyo-dynamic/modyo-design-system/dist/css/design-system.css';
import '@modyo-dynamic/modyo-design-system-react/dist/css/design-system-react.css';
import {
  LiquidContextProvider,
  ModalContextProvider,
  OffcanvasContextProvider,
} from '@modyo-dynamic/modyo-design-system-react';

import './styles/base.scss';
import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalDetailTransaction from './components/ModalDetailTransaction';
import OffcanvasAdvancedFilters from './components/OffcanvasAdvancedFilters';

const root = ReactDOM.createRoot(document.getElementById('productDetails') as Element);
root.render(
  <React.StrictMode>
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
              detailTransaction: ModalDetailTransaction,
            }}
          >
            <App />
          </ModalContextProvider>
        </OffcanvasContextProvider>
      </Provider>
    </LiquidContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
