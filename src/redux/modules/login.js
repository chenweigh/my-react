/**
 * 登录数据管理
 */
import { post } from "../../utils/request";
import url from "../../utils/url";
import { actions as ToastActions } from "./toast";
import { resolve } from "dns";
import { rejects } from "assert";

/** toast，loading, tip, confirm 的用法如下:
 * import { actions as LoadingActions } from "./loading";
 * import { actions as ToastActions } from "./toast";
 * import { actions as TipActions } from "./tip";
 * import { actions as ConfirmActions } from "./confirm";
 * dispatch(ToastActions.showToast("用户名和秘密不能为空！"));
 * dispatch(TipActions.showTip("用户名和秘密不能为空！"));
 * dispatch(LoadingActions.showLoading());
 * return dispatch(ConfirmActions.showConfirm("你去顶", ()=>{console.log("点了确定")}, ()=>{console.log("点了取消")dispatch(ConfirmActions.hideConfirm())}));
 */

const initialState = {
  username: localStorage.getItem("username") || "",
  password: "",
  token: localStorage.getItem("token"),
  status: localStorage.getItem("token") ? true : false //登录态标识
};

// action types
export const types = {
  LOGIN_SUCCESS: "LOGIN/LOGIN_SUCCESS",
  LOGOUT: "LOGIN/LOGOUT",
  SET_USERNAME: "LOGIN/SET_USERNAME",
  SET_PASSWORD: "LOGIN/SET_PASSWORD"
};

// action creators
export const actions = {
  // 异步action, 执行登录
  login: () => {
    return (dispatch, getState) => {
      const { username, password } = getState().login;
      // console.log(getState());
      if (!username || !password) {
        return dispatch(ToastActions.showToast("用户名和秘密不能为空！"));
      }

      let requestData = {};
      requestData["username"] = username;
      requestData["password"] = password;

      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          //登录成功
          let data = {"token":"123456"}
          dispatch(actions.loginSuccess(username, data.token));
          resolve();
        },1000)
      })
    };
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    return {
      type: types.LOGOUT
    };
  },
  loginSuccess: (username, token) => {
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    return {
      type: types.LOGIN_SUCCESS,
      username,
      token
    };
  },
  setUsername: username => ({
    type: types.SET_USERNAME,
    username
  }),
  setPassword: password => ({
    type: types.SET_PASSWORD,
    password
  })
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        status: true,
        token: action.token,
        username: action.username
      };
    case types.LOGOUT:
      return { ...state, status: false, username: "", password: "", token: "" };
    case types.SET_USERNAME:
      return { ...state, username: action.username };
    case types.SET_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUsername = state => state.login.username;

export const getPassword = state => state.login.password;

export const isLogin = state => state.login.status;
