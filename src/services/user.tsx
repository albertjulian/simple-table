import axios from 'axios';

interface Params {
  page: number;
  pageSize: number;
  results: number;
  gender?: string;
  keyword?: string;
  sortBy?: string;
  sortOrder?: string;
}

const getUserData = async (params: Params) => {
  const url = 'https://randomuser.me/api'
  try {
    const response = await axios.get(url, {
      params,
    });
    return response && response.data && response.data.results;
  } catch (error) {
    throw error;
  }
}

export default getUserData;