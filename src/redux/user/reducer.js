import actions from "./actionTypes";

const initialState = {
  loading: false,
  error: "",
  authorized: false,
  organizationId: null,
  teamId: [],
  permission: [],
};

// eslint-disable-next-line default-param-last
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.SET_STATE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default userReducer;
