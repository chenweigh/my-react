/**
 * Action弹框的状态管理
 */
const initialState = {
  status: false,
  content: "",
  cancelText: "取消",
  confirmText: "确定",
  confirmCB: null,
  cancelCB: null
};

export const types = {
  SHOW: "CONFIRM/SHOW",
  HIDE: "CONFIRM/HIDE"
};

//action creators
export const actions = {
  showConfirm: (content, confirmCB, cancelCB) => ({
    type: types.SHOW,
    content,
    confirmCB,
    cancelCB
  }),
  hideConfirm: () => ({
    type: types.HIDE
  })
};

const reducer = (state = initialState, action) => {
  // console.log(action);
  const { type, content, cancelCB, confirmCB } = action;
  if (type === types.SHOW) {
    return {
      ...state,
      status: true,
      content: content,
      confirmCB: confirmCB,
      cancelCB: cancelCB
    };
  } else if (type === types.HIDE) {
    return {
      ...state,
      status: false,
      content: "",
      confirmCB: null,
      cancelCB: null
    };
  }
  return state;
};

export default reducer;

// selectors
export const getConfirmStatus = state => state.confirm.status;

export const getConfirmContent = state => state.confirm.content;

export const getConfirmCancelText = state => state.confirm.cancelText;

export const getConfirmOkText = state => state.confirm.confirmText;

export const getConfirmCancelCB = state => state.confirm.cancelCB;

export const getConfirmOkCB = state => state.confirm.confirmCB;
