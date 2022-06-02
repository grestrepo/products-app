import type { NextPage } from 'next';
import { FormEvent } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

import { Layout } from '../../../components/layout';
import { useForm } from '../../../hooks';
import { instance } from '../../../api';
import { useRouter } from 'next/router';

const CreateProduct: NextPage = () => {
  const router = useRouter();
  const {form, name, description, price, stock, onChange} = useForm({
    name: '',
    description: '',
    price: 0,
    stock: 0
  });
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if(name.length === 0 || description.length === 0 || price === 0 || stock === 0){
      return;
    }
    console.log(form);
    try {
      const resp = await instance.post('/products', {
        data: {
          ...form
        }
      });
      console.log('Se creó el producto con éxito');
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
        <Typography variant="h4">Crear Producto</Typography>
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
              <Button variant="contained" type="submit" fullWidth>Crear</Button>
            </Box>
          </CardContent>
        </Card>

      </Box>
    </Layout>
  );
};

export default CreateProduct;