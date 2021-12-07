const initialState = {
  username: window.localStorage.getItem('username'),
  userinfo: null,
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'LOGOUT':
    case 'UPDATE_USER':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default rootReducer;