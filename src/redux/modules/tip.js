/**
 * 警告弹框的状态管理
 */
const initialState = {
  status: false,
  message: ""
};

export const types = {
  SHOW: "TIP/SHOW",
  HIDE: "TIP/HIDE"
};

//action creators
export const actions = {
  showTip: message => ({
    type: types.SHOW,
    message
  }),
  hideTip: () => ({
    type: types.HIDE
  })
};

const reducer = (state = initialState, action) => {
  const { type, message } = action;
  if (type === types.SHOW) {
    return { ...state, status: true, message: message };
  } else if (type === types.HIDE) {
    return { ...state, status: false, message: "" };
  }
  return state;
};

export default reducer;

// selectors
export const getTipStatus = state => {
  return state.tip.status;
};
export const getTipMessage = state => {
  return state.tip.message;
};
