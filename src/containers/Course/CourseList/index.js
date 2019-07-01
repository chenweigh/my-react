import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./style.css";

import { actions as CourseActions, getCourse, getLoadMoreStatus } from "../../../redux/modules/course";
import {getSelectCategoryName} from '../../../redux/modules/category';
import {getPathsData } from "../../../redux/modules/home";

import Path from "../../../components/Path";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.courseListRef = React.createRef();
    this.state = {
      paths: this.props.paths
    };
  }
  componentDidMount() {
    // console.log(this.props);
    if (this.state.paths.length < 3) {
      let paths = this.state.paths;
      paths.push({ title: this.props.categoryName, canClick: false });
      this.setState({
        paths: paths
      });
    }
    this.props.courseActions.fetchCourseListData();
  }
  //处理屏幕滚动事件，实现加载更多的效果
  handleScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight;
    let courseListTop = this.courseListRef.current.offsetTop;
    let courseListHeight = this.courseListRef.current.offsetHeight;
    let courseListScrollHeight = this.courseListRef.current.scrollHeight;
    let courseListScrollTop = this.courseListRef.current.scrollTop;
    // console.log("scrollHeight:",scrollHeight, "scrollTop:",scrollTop, "clientHeight:",clientHeight, "courseListTop:",this.courseListRef.current.offsetTop, "courseListHeight:",this.courseListRef.current.offsetHeight, "courseListScrollHeight:",courseListScrollHeight, "courseListScrollTop:",courseListScrollTop)
    if (courseListScrollHeight <= courseListHeight + courseListScrollTop) {
      //当内容高度小于可视高度+滚动条的高度时，触发事件
      if (this.props.loadMore) {
        console.log("还有更多数据，到达底部，继续加载新数据");
        this.props.courseActions.fetchNextData();
      } else {
        console.log("没有新数据了");
      }
    } else {
      console.log("没到底部");
    }
  };
  //查看学生点击事件
  handClick(item, index){
    console.log("paths--3", this.state.paths);
    // let data = Object.assign([], this.state.paths, []);
    let data = JSON.parse(JSON.stringify(this.state.paths));   //这里用深拷贝
    data[data.length - 1]["canClick"] = true;
    data.push({ title: "学生信息", canClick: false });
    this.props.history.push("/studentlist", { from: "/courselist", paths: data, "live_course": item.pk});
    console.log("paths--2", this.state.paths);
  };
  //路径点击事件
  handlePathClick = (item, index) => {
    if(item.canClick){
      let num = index - (this.state.paths.length - 1)
      console.log(num);
      this.props.history.go(num)
    }
  };
  render() {
    const { data: datas } = this.props;
    const { paths } = this.state;
    return (
      <div className="courseList" onScroll={this.handleScroll} ref={this.courseListRef}>
        <Path data={paths} handleClick={this.handlePathClick} />
        <div className="courseList__container">
          {datas.map((item, index) => {
            return (
              <div key={index} className="courseList__container__courseItem">
                <table className="courseList__container__courseItem__table" border="1">
                  <tbody>
                    <tr>
                      <td className="courseList__container__courseItem__table--td">课程名称</td>
                      <td className="courseList__container__courseItem__table--td">
                        {item.course_code ? item.course_code : item.course_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="courseList__container__courseItem__table--td">开班时间</td>
                      <td className="courseList__container__courseItem__table--td">{item.class_time}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="courseList__container__courseItem__courseInfo">
                  <p className="courseList__container__courseItem__courseInfo__item">{`任课老师：${item.teacher}`}</p>
                  <p className="courseList__container__courseItem__courseInfo__item">
                    {`班主任：${item.class_teacher}`}
                  </p>
                  <p className="courseList__container__courseItem__courseInfo__item">{`报名人数：${item.number} 人`}</p>
                </div>
                <div className="courseList__container__courseItem__btn">
                  <span className="courseList__container__courseItem__btn__watchStudent" onClick={this.handClick.bind(this, item, index)}>
                    查看学生
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    data: getCourse(state),
    loadMore: getLoadMoreStatus(state),
    categoryName:getSelectCategoryName(state),
    paths: getPathsData(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    courseActions: bindActionCreators(CourseActions, dispatch)
  };
};
// connect()接受两个参数，参数都是函数
// connect() 函数返回值依然是个函数，接受一个参数，组件.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseList);
