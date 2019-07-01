import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getLoadingStatus } from "../../redux/modules/loading";
import {
  actions as tipActions,
  getTipStatus,
  getTipMessage
} from "../../redux/modules/tip";
import {
  actions as toastActions,
  getToastStatus,
  getToastMessage
} from "../../redux/modules/toast";
import {
  getConfirmStatus,
  getConfirmContent,
  getConfirmCancelText,
  getConfirmOkText,
  getConfirmCancelCB,
  getConfirmOkCB,
} from "../../redux/modules/confirm";

import ErrorToast from "../../components/ErrorToast";
import Loading from "../../components/Loading";
import Tip from "../../components/Tip";
import Confirm from "../../components/Confirm";

import PrivateRoute from "../PrivateRoute";

import Home from "../Home";
import Login from "../Login";
import "./style.css";

class App extends Component {
  render() {
    const {
      toastStatus,
      toastMessage,
      toastActions: { hideToast },
      tipStatus,
      tipMessage,
      tipActions: { hideTip },
      loadingStatus,
      confirmStatus,
      confirmContent,
      confirmCancelText,
      confirmOkText,
      confirmCancelCB,
      confirmOkCB
    } = this.props;
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </Router>
        {toastStatus ? (
          <ErrorToast msg={toastMessage} clearError={hideToast} />
        ) : null}

        {tipStatus ? <Tip message={tipMessage} onClose={hideTip} /> : null}
        {loadingStatus ? <Loading /> : null}

        {confirmStatus ? (
          <Confirm
            content={confirmContent}
            cancelText={confirmCancelText}
            confirmText={confirmOkText}
            onCancel={confirmCancelCB}
            onConfirm={confirmOkCB}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    toastStatus: getToastStatus(state),
    toastMessage: getToastMessage(state),
    tipStatus: getTipStatus(state),
    tipMessage: getTipMessage(state),
    loadingStatus: getLoadingStatus(state),
    confirmStatus: getConfirmStatus(state),
    confirmContent: getConfirmContent(state),
    confirmCancelText: getConfirmCancelText(state),
    confirmOkText: getConfirmOkText(state),
    confirmCancelCB:getConfirmCancelCB(state),
    confirmOkCB:getConfirmOkCB(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toastActions: bindActionCreators(toastActions, dispatch),
    tipActions: bindActionCreators(tipActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
