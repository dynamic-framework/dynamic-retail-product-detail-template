import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import {
  DContextProvider,
  ModalContextProvider,
  OffcanvasContextProvider,
} from '@dynamic-framework/ui-react';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import ActivityDetailModal from './components/ActivityDetailModal';
import OffcanvasAdvancedFilters from './components/OffcanvasAdvancedFilters';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

const root = ReactDOM.createRoot(document.getElementById('accountDetails') as Element);
root.render(
  <StrictMode>
    <DContextProvider>
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
              activityDetail: ActivityDetailModal,
            }}
          >
            <App />
          </ModalContextProvider>
        </OffcanvasContextProvider>
      </Provider>
    </DContextProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
