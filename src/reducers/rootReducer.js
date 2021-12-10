const initialState = {
  username: window.localStorage.getItem('username'),
  userinfo: null,
  MoviesRecommend: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'LOGOUT':
    case 'UPDATE_USER':
      return Object.assign({}, state, action.payload)
    case 'UPDATE_FAVORITE':
      const favorite = action.payload.favorite
      const nextState = Object.assign({}, state)
      nextState.userinfo.favorite = favorite
      return nextState
    case 'UPDATE_MOVIES_RECOMMEND':
      const nextState1 = Object.assign({}, state)
      nextState1.MoviesRecommend = action.payload
      return nextState1
    default:
      return state
  }
};

export default rootReducer;