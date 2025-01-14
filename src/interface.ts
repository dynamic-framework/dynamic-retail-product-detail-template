import { Activity, Dispute } from './services/interface';

export type PortalAvailablePayload = {
  modalActivityDetail: {
    activity: Activity;
  };
  modalDisputeDetail: {
    dispute: Dispute;
  };
  modalCardInformation: undefined
  modalOTP: {
    callback: () => void;
  }
  offcanvasAdvancedFilters: undefined;
  offcanvasCheckbooksFilters: undefined;
  modalMoreActions: undefined;
};
