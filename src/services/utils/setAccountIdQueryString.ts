export default function setAccountIdQueryString(accountId: string) {
  const url = new URL(window.location.href);
  url.searchParams.set('account_id', accountId);
  window.history.pushState(null, '', url.toString());
}
