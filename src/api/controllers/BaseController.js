import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const PORT = process.env.REACT_APP_PORT;
const URL = PORT ? `${BACKEND_URL}:${PORT}` : BACKEND_URL;

export class BaseController {
  constructor() {
    this.url = URL;
    this.axios = axios;
  };

  static exec = async () => {
    try {
      const response = await axios.get(URL);
      return { message: response.data.message };
    } catch (error) {
      return { error };
    }
  }
}
