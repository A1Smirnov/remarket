// frontend/src/pages/Auth/Login.tsx

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Avatar, Grid, CssBaseline, Container, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Paper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const Form = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Сброс ошибки перед новой попыткой
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Сохранение токена и userId в localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);

      navigate('/profile'); // Переход на страницу профиля
    } catch (err) {
      // Проверка типа ошибки
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Invalid email or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <AvatarStyled>
          <LockOutlinedIcon />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit" fullWidth variant="contained" color="primary">
            LOGIN
          </SubmitButton>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Create New Account"}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Container>
  );
}

