import { BaseController } from './BaseController'
//Implement User controller
export class MovieController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  getGroupMovie = async (theme) => {
    try {
      const response = await this.axios.post(this.url + '/user/movie', {
        theme,
      })
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }

  getSearchMovie = async (name) => {
    try {
      const response = await this.axios.post(this.url + '/user/search', {
        name,
      })
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }

  getMovieIds = async (ids) => {
    try {
      const response = await this.axios.post(this.url + '/user/movie/get', {
        ids,
      })
      return { data: response.data }
    } catch (error) {
      return { error }
    }
  }
}
