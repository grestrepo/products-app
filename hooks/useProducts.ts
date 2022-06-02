import { useEffect, useState } from 'react';
import { instance } from '../api';

import { Product, ResponseStrapi } from '../interfaces';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const resp = await instance.get<ResponseStrapi>('/products');
    const { data } = resp.data;
    const productos = data.map(prod => {
      return {
        id: prod.id,
        ...prod.attributes
      };
    });
    setProducts(productos);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products
  };

};