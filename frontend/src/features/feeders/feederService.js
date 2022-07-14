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

const feederService = {
  createFeeder
}

export default feederService