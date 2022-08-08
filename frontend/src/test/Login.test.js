import React from 'react';
import { waitFor, screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../pages/Login.jsx';
import authReducer from '../features/auth/authSlice';
import feederReducer from '../features/feeders/feederSlice';
import reportReducer from '../features/reports/reportSlice';

function renderWithRedux(renderedComponent, url = '/') {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      feeder: feederReducer,
      report: reportReducer,
    },
  });

  return render(<MemoryRouter initialEntries={[url]} initialIndex={0}>

  <Provider store={store}>{renderedComponent}</Provider>
  </MemoryRouter>);
}

describe('Login', () => {
  it('should navigate to / if user attempts to go to login screen when logged in', async () => {
    enableFetchMocks();
    localStorage.setItem('loggedIn', 'true');
    fetchMock.mockIf('/', () => Promise.resolve(
      JSON.stringify({
        name: 'name',
        email: 'email@email.com',
        phoneNumber: '(222) 222-2222',
      }),
    ));

    renderWithRedux(
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<div>redirected</div>} />
      </Routes>,
      '/login',
    );

    await waitFor(() => {
      expect(screen.getByText('redirected')).toBeInTheDocument();
    });
  });

  it('should stay on login page if local storage false/null and no user', async () => {
    localStorage.removeItem('loggedIn');
    fetchMock.mockIf('/', () => Promise.resolve(JSON.stringify({})));

    renderWithRedux(
      <Routes>
        <Route exact path="/" element={<div>redirected</div>} />
        <Route exact path="/login" element={<Login />} />
      </Routes>,
      '/login',
    );

    await waitFor(() => {
      expect(screen.queryByText('redirected')).not.toBeInTheDocument();
    });
  });
});
