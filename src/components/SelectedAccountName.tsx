import SelectedAccountNameLoader from './loaders/SelectedAccountNameLoader';
import { useAppSelector } from '../store/hooks';
import { getIsLoading, getSelectedAccount } from '../store/selectors';

export default function SelectedAccountName() {
  const isLoading = useAppSelector(getIsLoading);
  const selectedAccount = useAppSelector(getSelectedAccount);

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
