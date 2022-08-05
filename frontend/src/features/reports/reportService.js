import axios from 'axios';

const API_URL = '/api/report/id';

const API_URL_SHOW = '/api/report/';

const createReport = async (reportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, reportData, config);

  return response.data;
};

const getReport = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL_SHOW, config);

  return response.data;
};

const likeReport = async (_id, token) => {
  const response = await axios({
    url: `${_id}/like`,
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const reportService = {
  createReport,
  getReport,
  likeReport,
};

export default reportService;
