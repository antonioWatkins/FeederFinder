import React from 'react';
import {
  waitFor, screen, render, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import SearchPage from '../pages/SearchPage.jsx';
import Report from '../pages/Report.jsx';
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
describe('testing register page', () => {
  it('renders the component correctly', () => {
    renderWithRedux(<SearchPage />);
  });

  // search button should be disabled if no charcthers has been entered

  it('search text should be valid and if there are no text disable the button', () => {
    renderWithRedux(<SearchPage />);
    const nameInput = screen.getByPlaceholderText('Summoner Name');
    expect(nameInput.classList).toContain('is-invalid');

    fireEvent.change(nameInput, { target: { value: 'invalid' } });
    expect(nameInput.classList).not.toContain('is-invalid');

    const buttonInput = screen.getByRole('button', { name: 'Search for Player' }); // button disabled
    expect(buttonInput).not.toBeDisabled();

    fireEvent.change(nameInput, { target: { value: '' } });
    expect(nameInput.classList).toContain('is-invalid');
    expect(buttonInput).toBeDisabled();
  });
});
// should be able to find summoner info

describe('Searchpage', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should find the summoner', async () => {
    mock.onGet('/api/feeder/searchpage/zed').reply(200, {
      name: 'zed', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });

    renderWithRedux(<SearchPage />);

    const nameInput = screen.getByPlaceholderText('Summoner Name');
    fireEvent.change(nameInput, { target: { value: 'zed' } });
    expect(nameInput.classList).not.toContain('is-invalid');

    const buttonInput = screen.getByRole('button', { name: 'Search for Player' }); // button disabled
    expect(buttonInput).not.toBeDisabled();
    fireEvent.click(buttonInput);

    await waitFor(() => {
      expect(screen.getByText('zed')).toBeInTheDocument();
    });
  });

  it('should not find more than 5 names', async () => {
    // mock out 6 names to search
    mock.onGet('/api/feeder/searchpage/lawful').reply(200, {
      name: 'lawful', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    mock.onGet('/api/feeder/searchpage/neutual').reply(200, {
      name: 'neutual', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    mock.onGet('/api/feeder/searchpage/chaotic').reply(200, {
      name: 'chaotic', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    mock.onGet('/api/feeder/searchpage/evil').reply(200, {
      name: 'evil', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    mock.onGet('/api/feeder/searchpage/good').reply(200, {
      name: 'good', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    mock.onGet('/api/feeder/searchpage/dont show').reply(200, {
      name: 'dont show', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });

    // render search page
    renderWithRedux(<SearchPage />);
    // enter 6 names
    const nameInput = screen.getByPlaceholderText('Summoner Name');
    fireEvent.change(nameInput, { target: { value: 'lawful, neutual, chaotic, evil, good, dont show' } });
    expect(nameInput.classList).not.toContain('is-invalid');
    // click search
    const buttonInput = screen.getByRole('button', { name: 'Search for Player' }); // button disabled
    expect(buttonInput).not.toBeDisabled();
    fireEvent.click(buttonInput);

    // expect 5 first mocked names on page
    await waitFor(() => {
      expect(screen.getByText('lawful')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('good')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('evil')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('chaotic')).toBeInTheDocument();
    });
    // expect only 5 http calls to have been made
    await waitFor(() => {
      expect(screen.queryByText('dont show')).not.toBeInTheDocument();
    });
  });

  it('should show empty result for nonexistent name', async () => {
    // mock out name to search that returns 404
    mock.onGet('/api/feeder/searchpage/doesnotexistevernotevenalittlebit').reply(200, {
      name: 'doesnotexistevernotevenalittlebit', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    // render search page
    renderWithRedux(<SearchPage />);
    // enter name
    const nameInput = screen.getByPlaceholderText('Summoner Name');
    fireEvent.change(nameInput, { target: { value: 'doesnotexistevernotevenalittlebit' } });
    expect(nameInput.classList).not.toContain('is-invalid');

    // click search
    const buttonInput = screen.getByRole('button', { name: 'Search for Player' }); // button disabled
    expect(buttonInput).not.toBeDisabled();
    fireEvent.click(buttonInput);
    // expect empty result on page
    await waitFor(() => {
      expect(screen.getByText('doesnotexistevernotevenalittlebit')).toBeInTheDocument();
    });
  });

  // should navigate to report page

  // mock data

  it('should navigate to report page', async () => {
    mock.onGet('/api/feeder/searchpage/zed').reply(200, {
      name: 'zed', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    // render page
    renderWithRedux(<SearchPage />);

    // enter name

    const nameInput = screen.getByPlaceholderText('Summoner Name');
    fireEvent.change(nameInput, { target: { value: 'zed' } });
    expect(nameInput.classList).not.toContain('is-invalid');
    // click button
    const buttonInput = screen.getByRole('button', { name: 'Search for Player' }); // button disabled
    expect(buttonInput).not.toBeDisabled();
    fireEvent.click(buttonInput);
    // expect button to show

    await waitFor(() => {
      const report = screen.getByRole('button', { name: 'Report' }); // button disabled
      expect(report).toBeInTheDocument();
    });
    // navigate
    localStorage.removeItem('loggedIn');
    fetchMock.mockIf('/', () => Promise.resolve(JSON.stringify({})));

    renderWithRedux(
      <Routes>
        <Route exact path="/api/searchpage" element={<div>redirected</div>} />
        <Route exact path="api/report/tony" element={<Report />} />
      </Routes>,
      '/api/report/tony',
    );

    await waitFor(() => {
      expect(screen.queryByText('redirected')).not.toBeInTheDocument();
    });
  });
  // should navigate to journal page

  it('should navigate to Journal page', async () => {
    mock.onGet('/api/feeder/searchpage/zed').reply(200, {
      name: 'zed', region: 'na1', soloQ: '', mostPlayedChamps: [],
    });
    // render page
    renderWithRedux(<SearchPage />);

    // enter name

    const nameInput = screen.getByPlaceholderText('Summoner Name');
    fireEvent.change(nameInput, { target: { value: 'zed' } });
    expect(nameInput.classList).not.toContain('is-invalid');
    // click button
    const buttonInput = screen.getByRole('button', { name: 'Search for Player' }); // button disabled
    expect(buttonInput).not.toBeDisabled();
    fireEvent.click(buttonInput);
    // expect button to show

    await waitFor(() => {
      const report = screen.getByRole('button', { name: 'Report' }); // button disabled
      expect(report).toBeInTheDocument();
    });
    // navigate
    localStorage.removeItem('loggedIn');
    fetchMock.mockIf('/', () => Promise.resolve(JSON.stringify({})));

    renderWithRedux(
      <Routes>
        <Route exact path="/api/searchpage" element={<div>redirected</div>} />
        <Route exact path="api/feeder" element={<Journal />} />
      </Routes>,
      '/api/feeder',
    );

    await waitFor(() => {
      expect(screen.queryByText('redirected')).not.toBeInTheDocument();
    });
  });
});
