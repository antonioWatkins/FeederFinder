import axios from "axios";

const API_URL ='/api/feeder/'

const createFeeder =async(feederData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

const response = await axios.post(API_URL, feederData, config)

return response.data
}

const getFeeder = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }


const response = await axios.get(API_URL, config)

return response.data
}

const deleteFeeder =async(feederId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

const response = await axios.delete(API_URL+feederId , config)

return response.data
}

const updateeFeeder =async(feederId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

const response = await axios.update(API_URL+feederId , config)

return response.data
}

const feederService = {
  createFeeder,
  getFeeder,
  deleteFeeder,
  updateeFeeder
}


export default feederService