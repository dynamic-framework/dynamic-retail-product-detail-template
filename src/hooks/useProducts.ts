import { useCallback, useEffect, useState } from 'react';
import {
  Product,
  ProductRepository,
  ProductType,
} from '@modyo-dynamic/modyo-service-retail';
import { liquidParser } from '@modyo-dynamic/modyo-design-system';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProducts, getSelectedProduct } from '../store/selectors';
import { setProducts, setSelectedProduct } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useProducts() {
  const [loadingList, setLoadingList] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const products = useAppSelector(getProducts);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoadingList(true);

    const productType = liquidParser.parse('{{vars.product-filter-by-type}}') as ProductType;

    const {
      perform,
      abort,
    } = ProductRepository.list([productType]);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        const data = await perform();
        dispatch(setProducts(data));
        if (data.length) {
          const urlParams = new URLSearchParams(window.location.search);
          const productId = urlParams.get('product_id');
          const product = data.find(({ id }) => id === productId) ?? data[0];

          const {
            perform: performProduct,
          } = ProductRepository.get(product.queryType, product.id);

          const dataProduct = await performProduct();
          dispatch(setSelectedProduct(dataProduct));
        }
        setLoadingList(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();
    return () => {
      abort();
    };
  }, [dispatch]);

  const callback = useCallback(async (productQueryType: Product['queryType'], accountId: Product['id']) => {
    setLoadingProduct(true);
    dispatch(setSelectedProduct(undefined));
    const {
      perform,
    } = ProductRepository.get(productQueryType, accountId);

    try {
      const data = await perform();
      dispatch(setSelectedProduct(data));
      setLoadingProduct(false);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoadingProduct(false);
      errorHandler(error);
      throw error;
    }
  }, [dispatch]);

  return {
    loadingList,
    loadingProduct,
    products,
    selectedProduct,
    callback,
  };
}
