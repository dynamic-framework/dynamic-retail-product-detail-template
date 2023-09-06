import SelectedAccountNameLoader from './loaders/SelectedAccountNameLoader';
import { useAppSelector } from '../store/hooks';
import { getAccountSelected, getIsLoadingAccountDetail } from '../store/selectors';

export default function SelectedAccountName() {
  const isLoading = useAppSelector(getIsLoadingAccountDetail);
  const selectedAccount = useAppSelector(getAccountSelected);

  if (isLoading) {
    return (
      <div className="mb-3">
        <SelectedAccountNameLoader />
      </div>
    );
  }

  if (!selectedAccount) {
    return null;
  }

  return (
    <h1 className="fs-4 fw-bold mb-3 p-0 pe-md-3">
      {selectedAccount.alias ?? selectedAccount.name}
    </h1>
  );
}
