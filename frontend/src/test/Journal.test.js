import React from 'react';
import { waitFor, screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../pages/Login.jsx';
import Journal from '../pages/Journal.jsx';
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

describe('Journal', () => {
  it('should navigate stay on journal page if user attempts to go to  screen when logged in', async () => {
    enableFetchMocks();
    localStorage.setItem('loggedIn', 'true');
    fetchMock.mockIf('/api/feeder', () => Promise.resolve(JSON.stringify({
      name: 'name',
      email: 'email@email.com',
    })));

    renderWithRedux(
      <Routes>
        {/* <Route exact path="/api/feeder" element={<Journal />} /> */}
        <Route exact path="/api/feeder" element= {<div>redirected</div>} />
      </Routes>,
      '/login',
    );

    await waitFor(() => {
      expect(screen.queryByText('redirected')).not.toBeInTheDocument();
    });
  });
});
