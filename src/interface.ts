import { Activity, Dispute } from './services/interface';

export type PortalAvailablePayload = {
  modalActivityDetail: {
    activity: Activity;
  };
  modalDisputeDetail: {
    dispute: Dispute;
  };
  modalCardInformation: undefined
  modalOtp: {
    callback: () => void;
  }
  offcanvasAdvancedFilters: undefined;
  offcanvasCheckbooksFilters: undefined;
  modalMoreActions: undefined;
};
