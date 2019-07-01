/**
 * 页面路径组件
 * data: [{ title: "课程管理", canClick: false }]
 */
import React, { Component } from "react";
import "./style.css";

class Path extends Component {
  handleClick(item, index) {
    if(this.props.handleClick){
      this.props.handleClick(item, index);
    }
  }
  render() {
    var this__ = this;
    const { data } = this.props;
    return (
      <div className="path">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={`path__item ${item.canClick ? "path__item--click" : ""}`}
              onClick={this__.handleClick.bind(this__, item, index)}>
              {index !== 0 ? <span className="path__arrow">></span> : null}
              <span className="path__text">{item.title} </span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Path;
