import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import {
  getUsername,
  getPassword,
  isLogin,
  actions as loginActions
} from "../../redux/modules/login";
import { IMG_LOGINBG, IMG_LOGINUSER, IMG_LOGINPW } from "../../utils/images";
import "./style.css";

class Login extends Component {
  handleChange = e => {
    if (e.target.name === "username") {
      this.props.loginActions.setUsername(e.target.value);
    } else if (e.target.name === "password") {
      this.props.loginActions.setPassword(e.target.value);
    }
  };
  handleSubmit = () => {
    this.props.loginActions.login();
  };
  render() {
    const {
      username,
      password,
      login,
      location: { state }
    } = this.props;
    if (login) {
      if (state && state.from) {
        return <Redirect to={state.from} />;
      }
      return <Redirect to="/" />;
    }
    return (
      <div className="login" style={{ backgroundImage: `url(${IMG_LOGINBG})` }}>
        <div className="login__container">
          <div className="login__header">
            <div className="login__header--chinese">用户登录</div>
            <div className="login__header--english">USER LOGIN</div>
          </div>
          <div className="login__row login__row--username">
            <img className="login__row_icon" src={IMG_LOGINUSER} alt="" />
            <input
              className="login__input"
              placeholder="请输入手机号"
              name="username"
              onChange={this.handleChange}
              value={username}
              type="number"
            />
          </div>
          <div className="login__row login__row--password">
            <img className="login__row_icon" src={IMG_LOGINPW} alt="" />
            <input
              className="login__input"
              placeholder="请输入密码"
              name="password"
              onChange={this.handleChange}
              value={password}
              type="password"
            />
          </div>
          <div className="login__footer">
            <div className="login__footer__checkboxContainer">
              <input
                className="login__footer__checkboxContainer__input"
                type="checkbox"
              />
              <span>记住用户名和密码</span>
            </div>
            <div className="login__footer__tipContainer">
              tips:官网账号即可登录
            </div>
          </div>
          <div className="login__btn" onClick={this.handleSubmit}>
            登录
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  // console.log(state);
  return {
    username: getUsername(state),
    password: getPassword(state),
    login: isLogin(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
