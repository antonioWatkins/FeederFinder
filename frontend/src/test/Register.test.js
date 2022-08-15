import React from 'react';
import {
  screen, fireEvent, render, waitFor, findByText,
} from '@testing-library/react';
import { Provider } from 'react-redux';
// As a basic setup, import your same slice reducers
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register.jsx';
// import store from '../app/store';
import authReducer from '../features/auth/authSlice';
import feederReducer from '../features/feeders/feederSlice';
import reportReducer from '../features/reports/reportSlice';

function renderWithRedux(renderedComponent) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      feeder: feederReducer,
      report: reportReducer,
    },
  });
  return render(<MemoryRouter>

  <Provider store={store}>{renderedComponent}</Provider>
  </MemoryRouter>);
}

describe('testing register page', () => {
  it('renders the component correctly', () => {
    renderWithRedux(<Register />);
  });
  it('test if a Summoners Name is valid', () => {
    renderWithRedux(<Register />);

    const nameInput = screen.getByPlaceholderText('Enter Summoners Name');
    expect(nameInput.classList).toContain('is-invalid');
    fireEvent.change(nameInput, { target: { value: 'invalid' } });
    expect(nameInput.classList).not.toContain('is-invalid');
  });

  it('should provide feedback on valid email addresses after typing something', () => {
    renderWithRedux(<Register />);

    const emailInput = screen.getByPlaceholderText('Enter Email');
    expect(emailInput.classList).toContain('is-invalid');

    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    expect(emailInput.classList).toContain('is-invalid');

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    expect(emailInput.classList).not.toContain('is-invalid');
  });

  it('should provide feedback on valid password after typing something', () => {
    renderWithRedux(<Register/>);

    const passwordInput = screen.getByPlaceholderText('Enter Password');
    expect(passwordInput.classList).toContain('is-invalid');

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(passwordInput.classList).toContain('is-invalid');

    fireEvent.change(passwordInput, { target: { value: 'atLeast8Chars' } });
    expect(passwordInput.classList).not.toContain('is-invalid');
  });

  it('should sign up button should be disabled if name is invalid and all else valid and becomes active when name updated to valid', () => {
    renderWithRedux(<Register/>);

    const buttonInput = screen.getByRole('button', { name: 'Submit' }); // button disabled
    expect(buttonInput).toBeDisabled();

    const nameInput = screen.getByPlaceholderText('Enter Summoners Name');
    fireEvent.change(nameInput, { target: { value: 'invalid' } });
    expect(nameInput.classList).not.toContain('is-invalid');

    const emailInput = screen.getByPlaceholderText('Enter Email');
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    expect(emailInput.classList).not.toContain('is-invalid');

    const passwordInput = screen.getByPlaceholderText('Enter Password');

    fireEvent.change(passwordInput, { target: { value: 'atLeast8Chars' } });
    expect(passwordInput.classList).not.toContain('is-invalid');

    expect(buttonInput).not.toBeDisabled(); // button NOT disabled
  });
  it('should provide feedback pasword and password2 are not equal', async () => {
    renderWithRedux(<Register/>);

    const buttonInput = screen.getByRole('button', { name: 'Submit' }); // button disabled
    expect(buttonInput).toBeDisabled();

    const nameInput = screen.getByPlaceholderText('Enter Summoners Name');
    fireEvent.change(nameInput, { target: { value: 'invalid' } });
    expect(nameInput.classList).not.toContain('is-invalid');

    const emailInput = screen.getByPlaceholderText('Enter Email');
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    expect(emailInput.classList).not.toContain('is-invalid');

    const passwordInput = screen.getByPlaceholderText('Enter Password');
    expect(passwordInput.classList).toContain('is-invalid');

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(passwordInput.classList).toContain('is-invalid');

    fireEvent.change(passwordInput, { target: { value: 'atLeast8Chars' } });
    expect(passwordInput.classList).not.toContain('is-invalid');

    const passwordInput2 = screen.getByPlaceholderText('Confirm Password');
    expect(passwordInput2.classList).not.toContain('is-invalid');

    fireEvent.change(passwordInput2, { target: { value: 'qwatLeast8Charss' } });
    expect(passwordInput.classList).not.toContain('is-invalid');

    expect(buttonInput).not.toBeDisabled(); // button NOT disabled

    fireEvent.click(buttonInput);
    const notMatch = await screen.findByText('Password does not match');

    await waitFor(() => {
      expect(notMatch).toBeInTheDocument();
    });
  });
});
