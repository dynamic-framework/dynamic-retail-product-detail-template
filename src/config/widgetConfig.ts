import liquidParser from '../utils/liquidParser';

export const ICONS = {
  pay: 'credit-card',
  transfer: 'send',
  statement: 'file-text',
  applyCredit: 'currency-dollar',
  advance: 'wallet2',
  paymentPlan: 'file-earmark-bar-graph',
};

export const SITE_LANG = liquidParser.parse('{{site.language}}');
export const SITE_URL = liquidParser.parse('{{site.url}}');
export const VARS_CURRENCY = {
  symbol: liquidParser.parse('{{vars.currency-symbol}}'),
  precision: Number(liquidParser.parse('{{vars.currency-precision}}')),
  separator: liquidParser.parse('{{vars.currency-separator}}'),
  decimal: liquidParser.parse('{{vars.currency-decimal}}'),
};

// PATHs
export const TRANSFER_PATH = liquidParser.parse('{{vars.transfers-path}}');
export const PAY_DEBT_PATH = liquidParser.parse('{{vars.pay-debt-path}}');
export const PAYMENTS_PATH = liquidParser.parse('{{vars.payments-path}}');
export const LOAN_APPLICATION_PATH = liquidParser.parse('{{vars.loan-application-path}}');
export const CASH_ADVANCE_PATH = liquidParser.parse('{{vars.cash-advance-path}}');
export const PRODUCT_BLOCK_PATH = liquidParser.parse('{{vars.product-block-path}}');
export const BANK_STATEMENTS_PATH = liquidParser.parse('{{vars.bank-statements-path}}');
export const CONFIGURE_RESTRICTIONS_PATH = liquidParser.parse('{{vars.configure-restrictions-path}}');

export const API_ACCOUNT_LIST_FILTER = liquidParser.parse('{{vars.account-list-filter}}');

// Accounts in slides
export const SLIDE_VIEWS = ['saving', 'credit-card', 'checking'];

// LANG
export const LANG = liquidParser.parse('{{site.language}}');

// DATE FORMAT
export const FORMAT_DATE = liquidParser.parse('{{vars.format-date}}');
export const FORMAT_DATE_FULL = liquidParser.parse('{{vars.format-date-full}}');

// DEFAULT NO VALUE
export const DETAIL_NO_VALUE = '-';

export const CONTEXT_CONFIG = {
  language: SITE_LANG,
  currency: VARS_CURRENCY,
};
