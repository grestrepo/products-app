import { FormEvent } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

import { instance } from '../../../api';
import { Layout } from '../../../components/layout';
import { useForm } from '../../../hooks';
import { Product, ResponseStrapi } from '../../../interfaces';

interface Props {
  product: Product;
}

const EditPage: NextPage<Props> = ({product}) => {
  const router = useRouter();
  const { form, name, description, price, stock, onChange } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock
  });
  const deleteProduct = async () => {
    try {
      const resp = await instance.delete(`/products/${product.id}`);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if(name.length === 0 || description.length === 0 || price === 0 || stock === 0){
      return;
    }
    try {
      const resp = await instance.put(`/products/${product.id}`, {
        data: {
          ...form
        }
      });
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Crear Producto" description="Página de creación de productos">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
      }}>
        <Typography variant="h4">Editar Producto</Typography>
        <Card sx={{ width: 500 }}>
          <CardContent>
            <Box component="form" onSubmit={submit}>
              <TextField
                sx={{marginBottom: 2}}
                id="name"
                name="name"
                label="Nombre"
                variant="filled"
                value={name}
                onChange={onChange}
                fullWidth
              />
              <TextField
                sx={{marginBottom: 2}}
                id="description"
                name="description"
                label="Descripción"
                variant="filled"
                value={description}
                onChange={onChange}
                multiline
                minRows={2}
                fullWidth
              />
              <TextField
                sx={{marginBottom: 2}}
                id="price"
                type="number"
                name="price"
                label="Precio"
                variant="filled"
                value={price}
                onChange={onChange}
                fullWidth
              />
              <TextField
                sx={{marginBottom: 2}}
                id="stock"
                type="number"
                name="stock"
                label="Stock"
                variant="filled"
                value={stock}
                onChange={onChange}
                fullWidth
              />
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <Button variant="contained" type="submit">
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={deleteProduct}>
                  Eliminar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const resp = await instance.get<ResponseStrapi>('/products');
  const {data} = resp.data;
  const products: Product[] = data.map(prod => {
    return {
      id: prod.id,
      ...prod.attributes
    };
  });

  const paths = products.map((value) => (
    {
      params: {
        id: value.id?.toString()
      }
    }
  ));
  
  return {
    paths,
    fallback: 'blocking'
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as any;  // your fetch function here 

  try {
    const resp = await instance.get(`/products/${id}`);
    const product = resp.data.data.attributes as Product;
    return {
      props: {
        product: {
          id: Number(id),
          ...product
        },
        revalidate: 86400
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
};

export default EditPage;