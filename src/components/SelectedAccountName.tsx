import { useAppSelector } from '../store/hooks';
import { getAccountSelected, getIsLoadingAccountDetail } from '../store/selectors';

import SelectedAccountNameLoader from './loaders/SelectedAccountNameLoader';

export default function SelectedAccountName() {
  const isLoading = useAppSelector(getIsLoadingAccountDetail);
  const selectedAccount = useAppSelector(getAccountSelected);

  if (isLoading) {
    return (
      <div className="mb-4">
        <SelectedAccountNameLoader />
      </div>
    );
  }

  if (!selectedAccount) {
    return null;
  }

  return (
    <h1 className="fs-4 fw-bold mb-4 p-0 pe-md-4">
      {selectedAccount.alias ?? selectedAccount.name}
    </h1>
  );
}
