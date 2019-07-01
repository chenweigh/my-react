import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";

import { getSelectCategoryName } from "../../../redux/modules/category";
import { getPathsData } from "../../../redux/modules/home";

import Path from "../../../components/Path";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: this.props.paths
    };
  }
  componentDidMount() {
    if (this.state.paths.length < 3) {
      let paths = this.state.paths;
      paths.push({ title: this.props.categoryName, canClick: false });
      this.setState({
        paths: paths
      });
      //   console.log(this.state.paths);
    }
  }
  //路径点击事件
  handlePathClick = (item, index) => {
    if (item.canClick) {
      let num = index - (this.state.paths.length - 1);
      console.log(num);
      this.props.history.go(num);
    }
  };
  render() {
    const { paths } = this.state;
    return (
      <div className="createCourse">
        <Path data={paths} handleClick={this.handlePathClick} />
        <div className="createCourse__container">
            <div className="createCourse__left"></div>
            <div className="createCourse__right"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categoryName: getSelectCategoryName(state),
    paths: getPathsData(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(CreateCourse);
