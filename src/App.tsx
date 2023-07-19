import Transactions from './components/Transactions';
import useProducts from './hooks/useProducts';
import Details from './components/Details';
import SelectedProductName from './components/SelectedProductName';

export default function App() {
  const {
    products,
    loadingList,
    loadingProduct,
    callback,
    selectedProduct,
  } = useProducts();

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12">
          <SelectedProductName
            loading={loadingProduct || loadingList}
          />
        </div>
        <div className="col-12 col-lg-7 col-xl-8 h-100 order-2 order-lg-1">
          <Transactions
            loading={loadingProduct || loadingList}
            product={selectedProduct}
          />
        </div>
        <div className="col-12 col-lg-5 col-xl-4 order-1 order-lg-2 mb-3 mb-lg-0">
          <Details
            products={products}
            selectedProduct={selectedProduct}
            callback={callback}
            loading={loadingProduct || loadingList}
          />
        </div>
      </div>
    </div>
  );
}
