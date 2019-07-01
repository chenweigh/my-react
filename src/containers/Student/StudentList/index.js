import React, { Component } from "react";
import "./style.css";
import Path from "../../../components/Path";
import FilterBar from "../../../components/FilterBar";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actions as TeamActions, getTeamList, getCurrentTeamPK } from "../../../redux/modules/team";
import { actions as StudentActions, getTeamStudentList, getPurchaseStudentList } from "../../../redux/modules/student";
import {getPathsData } from "../../../redux/modules/home";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: this.props.location.state && this.props.location.state.paths ? this.props.location.state.paths : this.props.paths
    };
  }

  componentDidMount() {
    // console.log(this.props);
    const {
      location: { state }
    } = this.props;

    if (state && state.from === "/courselist") {
      //从课程进来的，获取购买的用户
      let live_course = state.live_course ? state.live_course : 10;
      this.props.studentActions.fetchPurchaseStudentList(live_course);
    } else {
      this.props.teamActions.fetchTeamList(() => {
        //班级学生列表
        let team_pk = this.props.currentTeamPK;
        this.props.studentActions.fetchTeamStudentList(team_pk);
      });
    }
  }
  //班级筛选点击事件
  handleFilterBarClick = (item, index) => {
    let currentTeam = this.props.teamList[index];
    console.log(item, index, currentTeam.pk);
    this.props.teamActions.setCurrentTeam(currentTeam.pk);

    //刷新数据
    this.handleSearchEvent(null, currentTeam.pk);
  };
  //路径点击事件
  handlePathClick = (item, index) => {
    if (item.canClick) {
      let num = index - (this.state.paths.length - 1);
      console.log(num);
      this.props.history.go(num);
    }
  };
  //搜索按钮点击事件
  handleSearchEvent(e, pk) {
    this.props.studentActions.setTeamNextPage(1);
    let team_pk = pk ? pk : this.props.currentTeamPK;
    // console.log(this.props.currentTeamPK, team_pk)
    this.props.studentActions.fetchTeamStudentList(team_pk);
  }
  render() {
    const { paths } = this.state;
    const filters = this.props.teamList.map((item, index) => {
      return item.name;
    });
    const {
      location: { state }
    } = this.props;
    const students =
      state && state.from === "/courselist" ? this.props.purchaseStudentList : this.props.teamStudentList;
    return (
      <div className="studentList">
        <Path data={paths} handleClick={this.handlePathClick} />
        {!(state && state.from === "/courselist") ? (
          <div className="studentList__searchContainer">
            <span className="studentList__searchContainer__tag">筛选</span>
            <FilterBar data={filters} handleClick={this.handleFilterBarClick} />
            <span className="studentList__searchContainer__searchBtn" onClick={this.handleSearchEvent.bind(this)}>
              搜索
            </span>
          </div>
        ) : null}
        <div className="studentList__studentsContainer">
          <table className="studentList__infoTable">
            <tbody>
              <tr className="studentList__infoLabel">
                <th className="studentList__infoLabel__item">手机号</th>
                <th className="studentList__infoLabel__item">学生姓名</th>
                <th className="studentList__infoLabel__item">年龄</th>
                <th className="studentList__infoLabel__item">性别</th>
                <th className="studentList__infoLabel__item">所在省份</th>
                <th className="studentList__infoLabel__item">所在城市</th>
                <th className="studentList__infoLabel__item">寄送地址</th>
                <th className="studentList__infoLabel__item">收件人姓名</th>
                <th className="studentList__infoLabel__item">操作</th>
              </tr>
              {students.map((item, index) => {
                let bgStyle =
                  students.length % 2 === 0
                    ? index % 2 === 0
                      ? "studentList__infoValue--white"
                      : "studentList__infoValue--blue"
                    : index % 2 === 0
                    ? "studentList__infoValue--blue"
                    : "studentList__infoValue--white";
                return (
                  <tr key={index} className={`studentList__infoValue ${bgStyle}`}>
                    <td className="studentList__infoValue__item">{item.owner}</td>
                    <td className="studentList__infoValue__item">{item.name}</td>
                    <td className="studentList__infoValue__item">{item.age}</td>
                    <td className="studentList__infoValue__item">{item.sex_display}</td>
                    <td className="studentList__infoValue__item">{item.province}</td>
                    <td className="studentList__infoValue__item">{item.city}</td>
                    <td className="studentList__infoValue__item">{item.address.shipping_address}</td>
                    <td className="studentList__infoValue__item">{item.address.linkman}</td>
                    <td className="studentList__infoValue__item">
                      <span className="studentList__infoValue__item__updateBtn">修改</span>
                      {!(state && state.from === "/courselist") ? (
                        <span className="studentList__infoValue__item__evaluateBtn">学员评价</span>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  // console.log(state);
  return {
    currentTeamPK: getCurrentTeamPK(state),
    teamList: getTeamList(state),
    teamStudentList: getTeamStudentList(state),
    purchaseStudentList: getPurchaseStudentList(state),
    paths: getPathsData(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    teamActions: bindActionCreators(TeamActions, dispatch),
    studentActions: bindActionCreators(StudentActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList);
