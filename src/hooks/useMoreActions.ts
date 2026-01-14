import { useCallback } from 'react';

import {
  BANK_STATEMENTS_PATH,
  CASH_ADVANCE_PATH,
  CONFIGURE_RESTRICTIONS_PATH,
  ADDITIONAL_CARDS_PATH,
  NEW_ADDITIONAL_CARDS_PATH,
  NEW_VIRTUAL_CARD_PATH,
  API_ACCOUNT_LIST_FILTER,
} from '../config/widgetConfig';
import { AccountType } from '../services/config';

export const useMoreActions = () => useCallback(
  (accountId: string) => {
    const actions = [
      {
        text: 'modal.moreActions.bankStatements',
        link: `${BANK_STATEMENTS_PATH}?account_id=${accountId}`,
        icon: 'File',
      },
      {
        text: 'modal.moreActions.cashAdvance',
        link: `${CASH_ADVANCE_PATH}?account_id=${accountId}`,
        icon: 'Coins',
      },
      {
        text: 'modal.moreActions.additionalCardsList',
        link: `${ADDITIONAL_CARDS_PATH}?card_id=${accountId}`,
        icon: 'CreditCard',
      },
      {
        text: 'modal.moreActions.newAdditionalCard',
        link: `${NEW_ADDITIONAL_CARDS_PATH}?card_id=${accountId}`,
        icon: 'CirclePlus',
      },
      {
        text: 'modal.moreActions.newVirtualCard',
        link: `${NEW_VIRTUAL_CARD_PATH}?card_id=${accountId}`,
        icon: 'Phone',
      },
      {
        text: 'modal.moreActions.configureRestrictions',
        link: `${CONFIGURE_RESTRICTIONS_PATH}?card_id=${accountId}`,
        icon: 'SlidersHorizontal',
      },
    ];

    if ([
      AccountType.Checking,
      AccountType.CreditCard,
    ].includes(API_ACCOUNT_LIST_FILTER as AccountType)
    ) {
      return actions;
    }

    return [
      ...actions,
      {
        text: 'modal.moreActions.managePayments',
        link: '#',
        icon: 'receipt',
      },
      {
        text: 'modal.moreActions.changeDate',
        link: '#',
        icon: 'calendar-date',
      }];
  },
  [],
);
