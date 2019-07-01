/**
 * 辅助方法集
 */
import { actions as CourseActions } from "../redux/modules/course";
import { actions as HomeActions } from "../redux/modules/home";
//当切换头部分类时，页面数据刷新逻辑处理
export const reloadAction = (dispatch, getState, this__) => {
  let sideData = getState().home.management;
  // console.log(sideData.index, sideData.subIndex, this__.props);
  let categoryName = getState().category.name;
  let paths = getState().home.paths;
  const {
    location: { pathname, state }
  } = this__.props;
  switch (sideData.index) {
    case 0: {
      //课程管理
      switch (sideData.subIndex) {
        case 0: {
          //课程列表
          console.log("课程管理-课程列表");
          // 路由回到最初的，比如当左侧管理对应的不是初始的页面，则回到初始页面
          if (pathname !== "/courselist") {
            this__.props.history.replace("/courselist");
          }
          //刷新数据
          dispatch(CourseActions.reloadData());
          //更新 path
          paths[paths.length - 1]["title"] = categoryName;
          HomeActions.setPathsData(paths);
          break;
        }
        case 1: {
          //新建课程
          console.log("课程管理-新建课程");
          //更新 path
          paths[paths.length - 1]["title"] = categoryName;
          HomeActions.setPathsData(paths);
          break;
        }
        default:
          break;
      }
      break;
    }

    case 1: {
      //教室管理
      console.log("教室管理");
      break;
    }

    case 2: {
      //班级管理
      switch (sideData.subIndex) {
        case 0:
          //班级列表
          console.log("班级管理-班级列表");
          break;
        case 1:
          //学情表
          console.log("班级管理-学情表");
          break;
        case 2:
          //班级到课率
          console.log("班级管理-班级到课率");
          break;
        case 3:
          //学生评价
          console.log("班级管理-学生评价");
          break;
        default:
          break;
      }
      break;
    }

    case 3: {
      //学生管理
      switch (sideData.subIndex) {
        case 0:
          //信息管理
          console.log("学生管理-信息管理");
          break;
        case 1:
          //账户管理
          console.log("学生管理-账户管理");
          break;
        default:
          break;
      }
      break;
    }

    case 4: {
      //作业管理
      console.log("作业管理");
      break;
    }

    default:
      break;
  }
};

//当直接在浏览器地址栏输入地址时，页面左侧管理数据的下标初始化 index、subIndex，和 paths
export const initAction = this__ => {
  const {
    location: { pathname, state },
    homeActions
  } = this__.props;
  // console.log(this__.props);
  switch (pathname) {
    case "/courselist": {
      homeActions.setManagementIndex(0, 0);
      //初始化 paths
      let paths = [{ title: "课程管理", canClick: false }, { title: "课程列表", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/createcourse": {
      homeActions.setManagementIndex(0, 1);
      //初始化 paths
      let paths = [{ title: "课程管理", canClick: false }, { title: "新建课程", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/liveclassroom": {
      homeActions.setManagementIndex(1, 0);
      //初始化 paths
      let paths = [{ title: "教室管理", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/teamlist": {
      homeActions.setManagementIndex(2, 0);
      //初始化 paths
      let paths = [{ title: "班级管理", canClick: false }, { title: "班级列表", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/teamacademic": {
      homeActions.setManagementIndex(2, 1);
      //初始化 paths
      let paths = [{ title: "班级管理", canClick: false }, { title: "学情表", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/teamrate": {
      homeActions.setManagementIndex(2, 2);
      //初始化 paths
      let paths = [{ title: "班级管理", canClick: false }, { title: "班级到课率", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/teamevaluate": {
      homeActions.setManagementIndex(2, 3);
      //初始化 paths
      let paths = [{ title: "班级管理", canClick: false }, { title: "学生评价", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/studentlist": {
      if (!state) {
        homeActions.setManagementIndex(3, 0);
        //初始化 paths
        let paths = [{ title: "学生管理", canClick: false }, { title: "信息管理", canClick: false }];
        homeActions.setPathsData(paths);
      }

      break;
    }

    case "/studentaccount": {
      homeActions.setManagementIndex(3, 1);
      //初始化 paths
      let paths = [{ title: "学生管理", canClick: false }, { title: "账户管理", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    case "/homework": {
      homeActions.setManagementIndex(4, 0);
      //初始化 paths
      let paths = [{ title: "作业管理", canClick: false }];
      homeActions.setPathsData(paths);
      break;
    }

    default:
      break;
  }
};
