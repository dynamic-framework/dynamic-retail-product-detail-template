import { useAppSelector } from '../store/hooks';
import { getSelectedProduct } from '../store/selectors';
import SelectedProductNameLoader from './loaders/SelectedProductNameLoader';

type Props = {
  loading: boolean;
};

export default function SelectedProductName({ loading }: Props) {
  const selectedProduct = useAppSelector(getSelectedProduct);

  if (loading) {
    return (
      <div className="mb-3">
        <SelectedProductNameLoader />
      </div>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  return (
    <h1 className="fs-4 fw-bold mb-3 p-0 pe-md-3">
      {selectedProduct.alias ?? selectedProduct.name}
    </h1>
  );
}
