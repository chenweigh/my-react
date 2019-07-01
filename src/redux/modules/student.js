/**
 * 学生数据管理
 */
import { get } from "../../utils/request";
import url from "../../utils/url";

const initialState = {
  team:{
    //班级学生列表数据
    page:1,
    page_size:10,
    data:[],
    loadMore: false     //是否还有更多的数据的标志位
  },
  purchase:{
    //已购买课程学生列表数据
    page:1,
    page_size:10,
    data:[],
    loadMore: false     //是否还有更多的数据
  },
};

export const types = {
  //获取班级学生列表
  LOAD_TEAM_STUDENTS: "STUDENT/LOAD_TEAM_STUDENT",
  //获取已购买某课程的学生列表
  LOAD_PURCHASE_STUDENTS: "STUDENT/LOAD_PURCHASE_STUDENTS",
  //设置班级学生列表的分页数据
  SET_TEAM_NEXT_PAGE:"STUDENT/SET_TEAM_NEXT_PAGE",
  //设置购买学生列表的分页数据
  SET_PURCHASE_NEXT_PAGE:"STUDENT/SET_PURCHASE_NEXT_PAGE",
};

export const actions = {
  //请求班级学生列表
  fetchTeamStudentList: pk => {
    return (dispatch, getState) => {
      // console.log(pk);
      const team = getState().student.team;
      const {page, page_size} = team;
      const requestUrl = url.getTeamStudentList(pk, page, page_size);
      return get(requestUrl).then(
        data => {
          // console.log("网络请求", data);
          dispatch(actions.loadTeamStudentList(data));
        },
        error => {}
      );
    };
  },
  //请求已购课程学生列表
  fetchPurchaseStudentList: pk => {
    return (dispatch, getState) => {
      const purchase = getState().student.purchase;
      const {page, page_size} = purchase;
      const requestUrl = url.getPurchaseStudentList(pk, page, page_size);
      return get(requestUrl).then(
        data => {
          // console.log("网络请求", data);
          dispatch(actions.loadPurchaseStudentList(data));
        },
        error => {}
      );
    };
  },
  //处理班级学生列表
  loadTeamStudentList: data => ({
    type: types.LOAD_TEAM_STUDENTS,
    data
  }),
  //处理已购课程学生列表
  loadPurchaseStudentList: data => ({
    type: types.LOAD_PURCHASE_STUDENTS,
    data
  }),
  //设置班级分页数据，当不传参数时，默认下一页
  setTeamNextPage: (page) => ({
    type: types.SET_TEAM_NEXT_PAGE,
    page
  }),
  //设置已购课程分页数据，当不传参数时，默认下一页
  setPurchaseNextPage:(page) => ({
    type: types.SET_PURCHASE_NEXT_PAGE,
    page
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_TEAM_STUDENTS: {
      let count = state.team.data.length;
      let data = state.team.data.concat(action.data.slice(count, state.team.page_size+count))
      let loadMore = action.data.length - count > state.team.page_size ? true : false;

      return { ...state, team: {...state.team, data:data, loadMore:loadMore}};
    }
    case types.LOAD_PURCHASE_STUDENTS: {
      let count = state.purchase.data.length;
      let data = state.purchase.data.concat(action.data.slice(count, state.purchase.page_size+count))
      let loadMore = action.data.length - count > state.purchase.page_size ? true : false;
      return { ...state, purchase: {...state.purchase, data:data, loadMore:loadMore}};
    }
    case types.SET_TEAM_NEXT_PAGE:{
      let page = action.page ? action.page : state.team.page + 1;
      return {...state, team:{...state.team, page:page}};
    }
    case types.SET_PURCHASE_NEXT_PAGE:{
      let page = action.page ? action.page : state.purchase.page + 1;
      return {...state, purchase:{...state.purchase, page:page}};
    }
    default:
      return state;
  }
};

export default reducer;

export const getTeamStudentList = state => state.student.team.data;
export const getPurchaseStudentList = state => state.student.purchase.data;
