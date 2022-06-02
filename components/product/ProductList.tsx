import { Grid } from '@mui/material';
import { FC } from 'react';

import { ProductCard } from './';
import { Product } from '../../interfaces';

interface Props {
  products: Product[]
}

export const ProductList: FC<Props> = ({products}) => {
  return (
    <Grid container spacing={4}>
      {
        products.map(prod => (
          <ProductCard key={`${prod.id}`} product={prod} />
        ))
      }
    </Grid>
  );
};
