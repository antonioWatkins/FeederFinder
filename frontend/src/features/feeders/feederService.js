import axios from 'axios';

const API_URL = '/api/feeder/';
const API_URL_S = '/api/feeder/update';

const createFeeder = async (feederData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('making request');
  const response = await axios.post(API_URL, feederData, config);

  return response.data;
};

const getFeeder = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getFeederID = async (feederId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + feederId, config);

  return response.data;
};

const deleteFeeder = async (feederId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + feederId, config);

  return response.data;
};

const updateFeeder = async (feederId, feederData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + feederId, feederData, config);

  return response.data;
};

const updateMyFeeder = async (feederId, feederData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL_S + feederId, feederData, config);

  return response.data;
};

const feederService = {
  createFeeder,
  getFeeder,
  deleteFeeder,
  updateFeeder,
  updateMyFeeder,
  getFeederID,
};

export default feederService;
