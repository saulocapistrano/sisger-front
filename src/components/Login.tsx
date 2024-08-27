import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

export default function Login() {
  const navigate = useNavigate(); // Hook para redirecionamento
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', data);
      const { access_token } = response.data;

      // Armazenar o token no localStorage ou sessionStorage
      localStorage.setItem('token', access_token);

      // Redirecionar para o dashboard após login bem-sucedido
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md">
      <Heading as="h2" mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel>Senha</FormLabel>
          <Input type="password" {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button mt={6} width="full" colorScheme="teal" type="submit">Entrar</Button>
      </form>
    </Box>
  );
}
