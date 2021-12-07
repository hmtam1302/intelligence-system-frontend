import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const PORT = process.env.REACT_APP_PORT;
const URL = `${BACKEND_URL}:${PORT}`;

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
