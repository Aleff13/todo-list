import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders form', () => {
  render(<App />);
  const form = screen.getByTestId('login-form');
  expect(form).toBeInTheDocument();
});

test('renders form fields', () => {
  render(<App />);
  const usernameField = screen.getByTestId('username-login-form');
  expect(usernameField).toBeInTheDocument();

  const passwordField = screen.getByTestId('password-login-form');
  expect(passwordField).toBeInTheDocument();

  const signBtn = screen.getByTestId('sign-btn-login-form');
  expect(signBtn).toBeInTheDocument();
});

test('renders google login button', () => {
  render(<App />);
  const loginButton = screen.getByText(/Sign In With Google/i);
  expect(loginButton).toBeInTheDocument();
});
