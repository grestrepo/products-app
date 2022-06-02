import type { NextPage } from 'next';
import { Box, Button, Typography } from '@mui/material';

import { Layout } from '../components/layout';
import { useProducts } from '../hooks';
import { ProductList } from '../components/product';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const { products } = useProducts();
  return (
    <Layout title="Productos" description="Muestra de todos los productos">
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 4,
      }}>
        <Typography variant="h4" sx={{marginRight: 2}}>Productos Creados</Typography>
        <Button color="primary" variant="contained" onClick={() => router.push('/product/create')}>
          Crear Producto
        </Button>
      </Box>
      
      <ProductList products={products} />
    </Layout>
  );
};

export default Home;