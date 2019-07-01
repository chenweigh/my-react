import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import "./style.css";

import {
  actions as CategoryActions,
  getCategorys,
  getSelectCategoryIndex,
  getSelectCategoryPk
} from "../../redux/modules/category";
import { actions as HomeActions, getTabs, getTabIndex, getTabSubIndex, getPathsData } from "../../redux/modules/home";
import { actions as LoginActions } from "../../redux/modules/login";
import { actions as CourseActions } from "../../redux/modules/course";
import { initAction } from "../../utils";

import AsyncComponent from "../../utils/AsyncComponent";
import PrivateRoute from "../PrivateRoute";

import Header from "./components/Header";
import Sliderbar from "./components/Sidebar";

// import CourseList from "../Course/CourseList";
// import CreateCourse from "../Course/CreateCourse";
// import StudentList from "../Student/StudentList";
// import ClassroomList from "../Classroom/ClassroomList";
// import Homework from "../Homework";

const CourseList = AsyncComponent(() => import("../Course/CourseList"));
const CreateCourse = AsyncComponent(() => import("../Course/CreateCourse"));
const StudentList = AsyncComponent(() => import("../Student/StudentList"));
const ClassroomList = AsyncComponent(() => import("../Classroom/ClassroomList"));
const Homework = AsyncComponent(() => import("../Homework"));

class Home extends Component {
  componentDidMount() {
    // console.log(this.props);
    this.props.categoryActions.fetchLiveCourseCategory();
    this.props.homeActions.loadManagementData();
    initAction(this);
  }
  //左侧管理点击事件
  handleClickTab = (index, path, tag) => {
    const { setManagementSelectTab, setManagementSelectSubTab } = this.props.homeActions;
    if (tag === 0) {
      setManagementSelectTab(index);
    } else if (tag === 1) {
      setManagementSelectSubTab(index);
    }
    console.log("path:", path);
    this.props.history.replace(path);
  };
  //上面分类点击事件
  handleClickCategory = (category, index) => {
    const { selectTab, selectSubTab, selectCategory } = this.props;
    const { setCurrentCategory } = this.props.categoryActions;
    setCurrentCategory(category, index, this);
  };

  render() {
    const {
      categorys,
      selectCategory,
      currentCategoryPk,
      categoryActions: { setCurrentCategory },
      tabs,
      selectTab,
      selectSubTab,
      loginActions: { logout }
    } = this.props;

    return (
      <div className="home">
        <div className="home__header">
          <Header
            categorys={categorys}
            selectCategory={selectCategory}
            handleClick={this.handleClickCategory}
            quit={logout}
          />
        </div>
        <div className="home__container">
          <div className="home__sliderbarContainer">
            <Sliderbar
              tabs={tabs}
              selectTab={selectTab}
              selectSubTab={selectSubTab}
              handleClickTab={this.handleClickTab}
            />
          </div>
          <div className="home__rightContainer">
            {currentCategoryPk ? (
              <Switch>
                <Route path="/liveclassroom" component={ClassroomList} />
                <Route path="/homework" component={Homework} />
                <Route path="/courselist" component={CourseList} />
                <Route path="/createcourse" component={CreateCourse} />
                <Route path="/studentlist" component={StudentList} />
                <Redirect path="/" to="/courselist" />
              </Switch>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.log(state, props);
  return {
    categorys: getCategorys(state),
    selectCategory: getSelectCategoryIndex(state),
    currentCategoryPk: getSelectCategoryPk(state),

    tabs: getTabs(state),
    selectTab: getTabIndex(state),
    selectSubTab: getTabSubIndex(state),

    paths: getPathsData(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    categoryActions: bindActionCreators(CategoryActions, dispatch),
    homeActions: bindActionCreators(HomeActions, dispatch),
    loginActions: bindActionCreators(LoginActions, dispatch),
    courseActions: bindActionCreators(CourseActions, dispatch)
  };
};
// connect()接受两个参数，参数都是函数
// connect() 函数返回值依然是个函数，接受一个参数，组件.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
