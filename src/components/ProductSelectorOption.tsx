import { Dispatch, SetStateAction } from 'react';

import { MQuickActionButton } from '@modyo-dynamic/modyo-design-system-react';
import type { Product } from '@modyo-dynamic/modyo-service-retail';
import { ProductTypeConfig } from '@modyo-dynamic/modyo-service-retail';

type Props = {
  product: Product;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: Dispatch<SetStateAction<any>>;
};

export default function ProductSelectorOption({
  product,
  className,
  onClick,
}: Props) {
  return (
    <MQuickActionButton
      line1={product.alias ?? product.name}
      line2={`N° ${product.productNumber}`}
      className={className}
      representativeIcon={ProductTypeConfig[product.type].icon}
      onMClick={onClick}
    />
  );
}
