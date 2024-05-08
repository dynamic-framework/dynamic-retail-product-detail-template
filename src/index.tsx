import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { DContextProvider } from '@dynamic-framework/ui-react';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ModalActivityDetail from './components/modals/ModalActivityDetail';
import OffcanvasAdvancedFilters from './components/offcanvas/OffcanvasAdvancedFilters';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

import type { PortalAvailablePayload } from './interface';

const root = ReactDOM.createRoot(document.getElementById('accountDetails') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <DContextProvider<PortalAvailablePayload>
        portalName="portal"
        availablePortals={{
          modalActivityDetail: ModalActivityDetail,
          offcanvasAdvancedFilters: OffcanvasAdvancedFilters,
        }}
      >
        <div className="container">
          <App />
        </div>
      </DContextProvider>
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
