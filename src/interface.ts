import { Activity } from './services/interface';

export type PortalAvailablePayload = {
  modalActivityDetail: {
    activity: Activity;
  };
  modalOTP: {
    callback: () => void;
  };
  offcanvasAdvancedFilters: undefined;
  modalMoreActions: undefined;
};
