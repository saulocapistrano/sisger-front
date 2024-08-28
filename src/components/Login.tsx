import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Input, FormControl, FormLabel, FormErrorMessage, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/login.css'

interface IFormInput {
    matricula: string;
    password: string;
  }
  
  const schema = yup.object().shape({
    matricula: yup.string().required('Matrícula é obrigatória'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  });
  
  export default function Login() {
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  
    const onSubmit = async (data: IFormInput) => {
      try {
        const response = await axios.post('http://localhost:3001/auth/login', data);
        const { access_token } = response.data;
  
        localStorage.setItem('token', access_token);
  
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao fazer login', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    };
  
    return (
      <Box className="login-container">
        <Heading as="h2" className="login-heading">Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.matricula} className="form-control">
            <FormLabel>Matrícula</FormLabel>
            <Input type="text" {...register('matricula')} />
            <FormErrorMessage className="error-message">{errors.matricula?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password} className="form-control">
            <FormLabel>Senha</FormLabel>
            <Input type="password" {...register('password')} />
            <FormErrorMessage className="error-message">{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button className="submit-button" type="submit">
            Entrar
          </Button>
        </form>
      </Box>
    );
  }