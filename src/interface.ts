import { Activity } from './services/interface';

export type PortalAvailablePayload = {
  modalActivityDetail: {
    activity: Activity;
  };
  modalComplainDetail: {
    activity: Activity;
  };
  modalCardInformation: undefined
  modalOTP: {
    callback: () => void;
  }
  offcanvasAdvancedFilters: undefined;
  offcanvasCheckbooksFilters: undefined;
  modalMoreActions: undefined;
};
