/**
 * 左侧管理数据管理
 */
const initialState = {
  //管理数据
  management: {
    //左侧管理数据源
    index: 0,
    subIndex: 0,
    data: [
      {
        title: { text: "课程管理", path: "/courselist" },
        subTitle: [{ text: "课程列表", path: "/courselist" }, { text: "新建课程", path: "/createcourse" }]
      },
      {
        title: { text: "教室管理", path: "/liveclassroom" },
        subTitle: []
      },
      {
        title: { text: "班级管理", path: "/teamlist" },
        subTitle: [
          { text: "班级列表", path: "/teamlist" },
          { text: "学情表", path: "/teamacademic" },
          { text: "班级到课率", path: "/teamrate" },
          { text: "学生评价", path: "/teamevaluate" }
        ]
      },
      {
        title: { text: "学生管理", path: "/studentlist" },
        subTitle: [{ text: "信息管理", path: "/studentlist" }, { text: "账户管理", path: "/studentaccount" }]
      },
      {
        title: { text: "作业管理", path: "/homework" },
        subTitle: []
      }
    ]
  },
  //路径
  paths:[{ title: "课程管理", canClick: false },{ title: "课程列表", canClick: false }]
};
//Actions Type 类型名称定义
export const types = {
  //管理相关 types
  //获取所有管理数据
  LOAD_MANAGEMENT_DATA: "HOME/LOAD_MANAGEMENT_DATA",
  SET_MANAGEMENT_SELECT_TAB: "HOME/SET_MANAGEMENT_SELECT_TAB",
  SET_MANAGEMENT_SELECT_SUB_TAB: "HOME/SET_MANAGEMENT_SELECT_SUB_TAB",
  SET_MANAGEMENT_INDEX: "HOME/SET_MANAGEMENT_INDEX",
  SET_PATH_DATA: "HOME/SET_PATH_DATA",
};

//Actions
export const actions = {
  loadManagementData: () => ({
    type: types.LOAD_MANAGEMENT_DATA
  }),
  setManagementSelectTab: index => ({
    type: types.SET_MANAGEMENT_SELECT_TAB,
    index
  }),
  setManagementSelectSubTab: index => ({
    type: types.SET_MANAGEMENT_SELECT_SUB_TAB,
    index
  }),
  setManagementIndex: (index, subIndex) => ({
    type: types.SET_MANAGEMENT_INDEX,
    index,
    subIndex
  }),
  setPathsData:(paths)=>({
    type:types.SET_PATH_DATA,
    paths
  })
};

//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_MANAGEMENT_DATA:
      return { ...state };
    case types.SET_MANAGEMENT_SELECT_TAB:
      return {
        ...state,
        management: { ...state.management, index: action.index, subIndex: 0 }
      };
    case types.SET_MANAGEMENT_SELECT_SUB_TAB:
      return {
        ...state,
        management: { ...state.management, subIndex: action.index }
      };
    case types.SET_MANAGEMENT_INDEX:
      // console.log(action.index, action.subIndex);
      return {
        ...state,
        management: { ...state.management, subIndex: action.subIndex, index: action.index }
      };
      case types.SET_PATH_DATA:
      return {
        ...state,
        paths:action.paths
      };
    default:
      return state;
  }
};

export default reducer;

export const getTabs = state => state.home.management.data;
export const getTabIndex = state => state.home.management.index;
export const getTabSubIndex = state => state.home.management.subIndex;
export const getPathsData = state => state.home.paths;
