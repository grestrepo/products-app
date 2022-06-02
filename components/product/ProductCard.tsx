import { FC } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, Grid, Typography, CardActions, Button } from '@mui/material';
import currencyFormatter from 'currency-formatter';

import { Product } from '../../interfaces';

interface Props {
  product: Product
}

export const ProductCard: FC<Props> = ({product}) => {
  const router = useRouter();
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="h6" sx={{marginBottom: 2}}>{product.description}</Typography>
          <Typography variant="subtitle1">{currencyFormatter.format(product.price, {code: 'USD'})}</Typography>
          <Typography variant="subtitle1">Stock: {product.stock}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={() => {
            router.push(`/product/edit/${product.id}`);
          }}>
            Editar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
