import { useCallback, useState } from 'react';
import { MPopover, MQuickActionButton } from '@modyo-dynamic/modyo-design-system-react';
import { ProductTypeConfig, type Product } from '@modyo-dynamic/modyo-service-retail';
import ProductSelectorLoader from './loaders/ProductSelectorLoader';

type Props = {
  callback: (type: Product['queryType'], id: Product['id']) => Promise<Product>;
  selectedProduct?: Product;
  loading: boolean;
  products: Array<Product>;
};

export function ProductSelector({
  products,
  loading,
  callback,
  selectedProduct,
}: Props) {
  const [toggle, setToggle] = useState(false);
  const handlerSelect = useCallback(async (product: Product) => {
    if (selectedProduct && selectedProduct.id !== product.id) {
      await callback(product.queryType, product.id);
    }
    setToggle(false);
  }, [callback, selectedProduct]);

  if (loading) {
    return <ProductSelectorLoader />;
  }

  if (!selectedProduct) {
    return <>No products</>;
  }

  if (products.length === 1) {
    return (
      <MQuickActionButton
        line1={selectedProduct.alias ?? selectedProduct.name}
        line2={`N° ${selectedProduct.productNumber}`}
        className="selected-product position-relative"
        representativeIcon={ProductTypeConfig[selectedProduct.type].icon}
        representativeIconTheme={ProductTypeConfig[selectedProduct.type].theme}
        representativeIconHasCircle
        actionIcon="" // TODO: Remove html element if is undefined - DS
      />
    );
  }

  return (
    <div className="product-selector">
      <MPopover
        isOpen={toggle}
        setIsOpen={setToggle}
        renderComponent={() => (
          <MQuickActionButton
            line1={selectedProduct.alias ?? selectedProduct.name}
            line2={`N° ${selectedProduct.productNumber}`}
            className="selected-product position-relative"
            representativeIcon={ProductTypeConfig[selectedProduct.type].icon}
            representativeIconTheme={ProductTypeConfig[selectedProduct.type].theme}
            representativeIconHasCircle
            actionIcon={toggle ? 'chevron-up' : 'chevron-down'}
          />
        )}
      >
        <div className="rounded overflow-hidden drop-product">
          {products.map((option: Product, i) => (
            <MQuickActionButton
              key={option.id}
              line1={option.alias ?? option.name}
              line2={`N° ${option.productNumber}`}
              className={selectedProduct.id === option.id ? 'selected' : undefined}
              representativeIcon={ProductTypeConfig[option.type].icon}
              representativeIconTheme={ProductTypeConfig[option.type].theme}
              representativeIconHasCircle
              actionIcon=""
              onMClick={() => handlerSelect(option)}
            />
          ))}
        </div>
      </MPopover>
    </div>
  );
}
