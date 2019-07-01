/**
 * toast弹框的状态管理
 */
const initialState = {
  status: false,
  message: ""
};

export const types = {
  SHOW: "TOAST/SHOW",
  HIDE: "TOAST/HIDE"
};

//action creators
export const actions = {
  showToast: message => ({
    type: types.SHOW,
    message
  }),
  hideToast: () => ({
    type: types.HIDE
  })
};

const reducer = (state = initialState, action) => {
  const { type, message } = action;
  if (type === types.SHOW) {
    return { ...state, message: message, status: true };
  } else if (type === types.HIDE) {
    return { ...state, message: "", status: false };
  }
  return state;
};

export default reducer;

// selectors
export const getToastStatus = state => {
  return state.toast.status;
};
export const getToastMessage = state => {
  return state.toast.message;
};
