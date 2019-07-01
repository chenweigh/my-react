import React, { Component } from "react";
import "./style.css";

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading__container">
          <div className="loading__img" />
          <span className="loading__text">正在加载...</span>
        </div>
      </div>
    );
  }
}

export default Loading;
