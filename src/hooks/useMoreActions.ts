import { useCallback } from 'react';

import {
  BANK_STATEMENTS_PATH,
  CASH_ADVANCE_PATH,
  CONFIGURE_RESTRICTIONS_PATH,
  ADDITIONAL_CARDS_PATH,
  NEW_ADDITIONAL_CARDS_PATH,
  NEW_VIRTUAL_CARD_PATH,
} from '../config/widgetConfig';

export const useMoreActions = () => useCallback(
  (accountId: string) => [
    {
      text: 'modal.moreActions.bankStatements',
      link: BANK_STATEMENTS_PATH,
      icon: 'file-text',
    },
    {
      text: 'modal.moreActions.cashAdvance',
      link: CASH_ADVANCE_PATH,
      icon: 'cash-coin',
    },
    {
      text: 'modal.moreActions.additionalCardsList',
      link: `${ADDITIONAL_CARDS_PATH}?card_id=${accountId}`,
      icon: 'credit-card-2-back',
    },
    {
      text: 'modal.moreActions.newAdditionalCard',
      link: `${NEW_ADDITIONAL_CARDS_PATH}?card_id=${accountId}`,
      icon: 'plus-circle',
    },
    {
      text: 'modal.moreActions.newVirtualCard',
      link: `${NEW_VIRTUAL_CARD_PATH}?card_id=${accountId}`,
      icon: 'phone',
    },
    {
      text: 'modal.moreActions.configureRestrictions',
      link: CONFIGURE_RESTRICTIONS_PATH,
      icon: 'toggles',
    },
    {
      text: 'modal.moreActions.managePayments',
      link: '#',
      icon: 'receipt',
    },
    {
      text: 'modal.moreActions.changeDate',
      link: '#',
      icon: 'calendar-date',
    },
  ],
  [],
);