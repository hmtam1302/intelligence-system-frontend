import { BaseController } from "./BaseController";
import axios from "../axios";
import requests from "../requests";
//Implement User controller
export class MovieController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  getGroupMovie = async (fetchUrl) => {
    try {
      const response = await axios.get(fetchUrl);
      return { data: response.data.results };
    } catch (error) {
      return { error };
    }
  };

  getSearchMovie = async (name) => {
    try {
      const response = await this.axios.post(this.url + "/user/search", {
        name,
      });
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  };

  getMovieIds = async (ids) => {
    try {
      const response = await this.axios.post(this.url + "/user/movie/get", {
        ids,
      });
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  };
}
