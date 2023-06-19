import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import '../App.css';
import { User } from "firebase/auth";
import Auth from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

const defaultTheme = createTheme();

export default function Login() {
    const auth = new Auth()

    const [user, setUser] = useState<User | null>(auth.user)
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const email = data.get('email')?.toString()
      const password = data.get('password')?.toString()

      if (!email || !password) {
        return
      }
      auth.loginEmailPassword(email, password, setUser)
    };

    useEffect(() => {
        if (!user) {
            return
        }
        
        navigate('/todos')

    }, [user]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} data-testid="login-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              data-testid="username-login-form"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              data-testid="password-login-form"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              data-testid="sign-btn-login-form"
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => auth.login(setUser)}
              sx={{ mt: 3, mb: 2 }}
              startIcon={<GoogleIcon/>}
            >
              Sign In With Google
            </Button>
          </Box>
          <Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}