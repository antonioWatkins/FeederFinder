import React from 'react';
import axios from 'axios';
import {
  waitFor, screen, render, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../pages/Login.jsx';
import UpdateJournal from '../pages/UpdateJournal.jsx';
import authReducer from '../features/auth/authSlice';
import feederReducer, { initialState } from '../features/feeders/feederSlice';
import reportReducer from '../features/reports/reportSlice';

function renderWithRedux(renderedComponent, url = '/') {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      feeder: feederReducer,
      report: reportReducer,
    },
    preloadedState: {
      auth: {
        user: {
          token: 'testtoken',
        },
      },
      feeder: initialState,
    },
  });

  return render(<MemoryRouter initialEntries={[url]} initialIndex={0}>

  <Provider store={store}>{renderedComponent}</Provider>
  </MemoryRouter>);
}
describe('UpdateJournal', () => {
  it('should navigate stay on journal page if user attempts to go to  screen when logged in', async () => {
    localStorage.setItem('loggedIn', 'true');

    renderWithRedux(
      <Routes>
        <Route exact path="/api/feeder/12345" element={<UpdateJournal />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>,
      '/login',
    );

    await waitFor(() => {
      expect(screen.queryByText('redirected')).not.toBeInTheDocument();
    });

    // it should show the results of he get
  });
});

describe('Update Journal', () => {
  let mock;

  beforeEach(() => {
    localStorage.setItem('loggedIn', 'true');

    mock = new MockAdapter(axios);
    mock.onGet('/api/feeder/12345').reply(200, []);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should show Update Journal', async () => {
    mock.onGet('/api/feeder/12345').reply(200, [{
      feeder: {
        summoner: 'zed',
      },
    }]);
    renderWithRedux(<UpdateJournal />);
    await waitFor(() => {
      expect(screen.getByText('Update')).toBeInTheDocument();
    });
  });
});
