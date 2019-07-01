/**
 * 如果某个页面需要登录后才展示，则需要将该页面通过该组件判断转换一下，未登录时重定向到登录页，否则展示当前页
 */
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isLogin } from "../../redux/modules/login";

class PrivateRoute extends Component {
  render() {
    const { component: Component, login, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return login ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.log(state)
  return {
    login: isLogin(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
