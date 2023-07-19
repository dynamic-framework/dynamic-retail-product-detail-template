import classNames from 'classnames';
import { Product } from '@modyo-dynamic/modyo-service-retail';
import { ProductSelector } from './ProductSelector';
import ProductDetail from './ProductDetail';

type Props = {
  products: Product[];
  selectedProduct?: Product;
  callback: (type: Product['queryType'], id: Product['id']) => Promise<Product>;
  loading: boolean;
};

export default function Details({
  products,
  selectedProduct,
  loading,
  callback,
}: Props) {
  return (
    <div className={classNames(
      'bg-indigo-100 rounded p-3 custom-details',
      'd-flex flex-column gap-4',
    )}
    >
      <ProductSelector
        products={products}
        loading={loading}
        callback={callback}
        selectedProduct={selectedProduct}
      />
      <ProductDetail
        selectedProduct={selectedProduct}
        loading={loading}
      />
    </div>
  );
}
