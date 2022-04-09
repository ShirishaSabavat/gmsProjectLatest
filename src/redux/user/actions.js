import actions from './actionTypes';

const userLogin = (payload) => ({
  type: actions.LOGIN,
  payload,
});

const userLoad = (payload) => ({
  type: actions.LOAD_CURRENT_ACCOUNT,
  payload,
});

const userLoginError = (payload) => ({
  type: actions.SET_STATE,
  payload,
});

const userLogout = (payload) => ({
  type: actions.LOGOUT,
  payload,
});

export {
  userLogin,
  userLoginError,
  userLogout,
  userLoad,
};
