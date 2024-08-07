import { BaseController } from "./BaseController";
//Implement User controller
export class UserController extends BaseController {
  constructor(username) {
    super();
    this.username = username;
  }

  login = async (password) => {
    try {
      // const response = await this.axios.post(this.url + "/user/login", {
      //   username: this.username,
      //   password,
      // });
      return { message: "OK" };
    } catch (error) {
      return { error };
    }
  };

  register = async ({ password, email, phone }) => {
    try {
      const { status, message } = await this.axios.post(
        this.url + "/user/register",
        {
          username: this.username,
          password,
          email,
          phone,
        }
      );
      return { status, message };
    } catch (error) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
  };

  getInfo = async () => {
    try {
      // const response = await this.axios.get(
      //   this.url + `/user/info/${this.username}`
      // );
      return {
        data: {
          username: "admin",
          email: "admin@example.com",
          phone: "123457",
          img: "",
        },
      };
    } catch (error) {
      return { error };
    }
  };

  update = async (changes) => {
    try {
      const response = await this.axios.put(
        this.url + `/user/update/${this.username}`,
        { changes }
      );
      return { data: response.data };
    } catch (error) {
      throw error;
    }
  };

  configApriori = async (id, support, confidence) => {
    try {
      const response = await this.axios.post(
        this.url + `/user/apriori/argument`,
        { id, support, confidence }
      );
      return { data: response.data };
    } catch (error) {
      throw error;
    }
  };

  getAssociateRules = async (movieId) => {
    try {
      const response = await this.axios.post(
        this.url + `/user/apriori/recommend`,
        { username: this.username, movieId: +movieId }
      );
      return { data: response.data };
    } catch (error) {
      throw error;
    }
  };
}
