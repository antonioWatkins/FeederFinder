/* eslint-disable jest/no-identical-title */
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
import Journal from '../pages/Journal.jsx';
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

describe('Journal', () => {
  it('should navigate stay on journal page if user attempts to go to  screen when logged in', async () => {
    localStorage.setItem('loggedIn', 'true');

    renderWithRedux(
      <Routes>
        <Route exact path="/api/feeder" element={<Journal />} />
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

describe('Journal', () => {
  let mock;

  beforeEach(() => {
    localStorage.setItem('loggedIn', 'true');

    mock = new MockAdapter(axios);
    mock.onGet('/api/feeder/').reply(200, []);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return an message at the bottom of the screen', async () => {
    renderWithRedux(<Journal />);
    await waitFor(() => {
      expect(screen.getByText('Enter an Entry into your journal')).toBeInTheDocument();
    });

    screen.getByRole('heading', { name: 'Journal' });
    await waitFor(() => {
      expect(screen.getByText('Journal')).toBeInTheDocument();
    });

    screen.getByRole('heading', { name: 'Enter an Entry into your journal' });
    await waitFor(() => {
      expect(screen.getByText('Enter an Entry into your journal')).toBeInTheDocument();
    });

    console.log('hydra');
  });
  // enter valid summoners name

  it('submit button should be disabled', async () => {
    renderWithRedux(<Journal />);
    await waitFor(() => {
      expect(screen.getByText('Enter an Entry into your journal')).toBeInTheDocument();
    });
    const nameInput = screen.getByPlaceholderText('Enter Summoners Name');
    expect(nameInput.classList).toContain('is-invalid');
    fireEvent.change(nameInput, { target: { value: '' } });
    expect(nameInput.classList).toContain('is-invalid');

    // button should be disabled
    const buttonInput = screen.getByRole('button', { name: 'Submit' }); // button disabled
    expect(buttonInput).toBeDisabled();
  });

  describe('Journal', () => {
    it('submit button should be enabled', async () => {
      renderWithRedux(<Journal />);
      await waitFor(() => {
        expect(screen.getByText('Enter an Entry into your journal')).toBeInTheDocument();
      });
      const buttonInput = screen.getByRole('button', { name: 'Submit' }); // button disabled
      expect(buttonInput).toBeDisabled();

      const nameInput = screen.getByPlaceholderText('Enter Summoners Name');
      expect(nameInput.classList).toContain('is-invalid');

      fireEvent.change(nameInput, { target: { value: 'valid' } });
      expect(nameInput.classList).not.toContain('is-invalid');
      expect(buttonInput).not.toBeDisabled();
      fireEvent.click(buttonInput);
    });
    describe('Journal', () => {
      it('should fetch new journal entry', async () => {
        mock.onPost('/api/feeder/').reply(200, {
          summoner: 'zed', teamGrade: '', laning: '', teamfighting: '',
        });
        renderWithRedux(<Journal />);
        await waitFor(() => {
          expect(screen.getByText('Enter an Entry into your journal')).toBeInTheDocument();
        });
        const buttonInput = screen.getByRole('button', { name: 'Submit' }); // button disabled
        expect(buttonInput).toBeDisabled();

        const nameInput = screen.getByPlaceholderText('Enter Summoners Name');
        expect(nameInput.classList).toContain('is-invalid');

        fireEvent.change(nameInput, { target: { value: 'zed' } });
        expect(nameInput.classList).not.toContain('is-invalid');
        expect(buttonInput).not.toBeDisabled();
        fireEvent.click(buttonInput);
        await waitFor(() => {
          expect(screen.getByText('summoner: zed')).toBeInTheDocument();
        });
      });
    });
    it('should fetch new journal entry', async () => {
      mock.onPost('/api/feeder/').reply(200, {
        summoner: 'zed', teamGrade: '', laning: '', teamfighting: '',
      });
      renderWithRedux(<Journal />);
      await waitFor(() => {
        expect(screen.getByText('Enter an Entry into your journal')).toBeInTheDocument();
      });
      const buttonInput = screen.getByRole('button', { name: 'Submit' }); // button disabled
      expect(buttonInput).toBeDisabled();

      const nameInput = screen.getByPlaceholderText('Enter Summoners Name');
      expect(nameInput.classList).toContain('is-invalid');

      fireEvent.change(nameInput, { target: { value: 'zed' } });
      expect(nameInput.classList).not.toContain('is-invalid');
      expect(buttonInput).not.toBeDisabled();
      fireEvent.click(buttonInput);
      await waitFor(() => {
        expect(screen.getByText('summoner: zed')).toBeInTheDocument();
      });
      const buttonDelete = screen.getByRole('button', { name: 'Delete' });
      expect(buttonDelete).not.toBeDisabled();
      fireEvent.click(buttonDelete);
      await waitFor(() => {
        expect(screen.queryByText('summoner: zed')).not.toBeInTheDocument();
      });
    });
  });
});
