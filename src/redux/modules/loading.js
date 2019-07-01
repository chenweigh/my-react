/**
 * 加载动画的状态管理
 */
const initialState = {
  status: false
};

export const types = {
  SHOW: "LOADING/SHOW",
  HIDE: "LOADING/HIDE"
};

//action creators
export const actions = {
  showLoading: () => ({
    type: types.SHOW
  }),
  hideLoading: () => ({
    type: types.HIDE
  })
};

const reducer = (state = initialState, action) => {
    // console.log( "type:", action.type)
  const { type } = action;
  if (type === types.SHOW) {
    return { ...state, status: true };
  } else if (type === types.HIDE) {
    return { ...state, status: false };
  }
  return state;
};

export default reducer;

// selectors
export const getLoadingStatus = state => {
  return state.loading.status;
};
