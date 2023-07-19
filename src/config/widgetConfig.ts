import { liquidParser } from '@modyo-dynamic/modyo-design-system';

export const ICONS = {
  pay: 'credit-card',
  transfer: 'send',
  statement: 'file-text',
  applyCredit: 'currency-dollar',
  advance: 'wallet2',
  paymentPlan: 'file-earmark-bar-graph',
};

// URLs
export const SITE_URL = liquidParser.parse('{{site.url}}');

// PATHs
export const TRANSFER_PATH = liquidParser.parse('{{vars.transfers-path}}');
export const PAY_DEBT_PATH = liquidParser.parse('{{vars.pay-debt-path}}');
export const PAYMENTS_PATH = liquidParser.parse('{{vars.payments-path}}');
export const LOAN_APPLICATION_PATH = liquidParser.parse('{{vars.loan-application-path}}');

// LANG
export const LANG = liquidParser.parse('{{site.language}}');

// DATE FORMAT
export const FORMAT_DATE = liquidParser.parse('{{vars.format-date}}');
export const FORMAT_DATE_FULL = liquidParser.parse('{{vars.format-date-full}}');

// DEFAULT NO VALUE
export const DETAIL_NO_VALUE = '-';
