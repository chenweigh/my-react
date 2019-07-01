/**
 * 直播课程数据管理
 */
import { get } from "../../utils/request";
import url from "../../utils/url";

const initialState = {
  page: 1,
  page_size: 10,
  data: [],
  loadMore: false //是否还有更多的数据
};
//Actions Type 类型名称定义
export const types = {
  LOAD_COURSE_LIST_DATA: "COURSE/COURSE_LIST",
  NEXT_PAGE_DATA: "COURSE/NEXT_PAGE_DATA",
  RESET_PAGE_DATA: "COURSE/RESET_PAGE_DATA"
};

//Actions
export const actions = {
  reloadData: () => {
    return (dispatch, getState) => {
      dispatch(actions.resetPageData());
      dispatch(actions.fetchCourseListData());
    };
  },
  fetchNextData: () => {
    return (dispatch, getState) => {
      dispatch(actions.loadNextData());
      dispatch(actions.fetchCourseListData());
    };
  },
  fetchCourseListData: () => {
    return (dispatch, getState) => {
      let categoryPk = getState().category.pk;
      let page = getState().course.page;
      let page_size = getState().course.page_size;
      let requestUrl = url.getLiveCourseList(categoryPk, page, page_size);
      console.log(requestUrl);
      return get(requestUrl).then(
        data => {
          let result = data.filter(val => {
            if (val.course_category === categoryPk) return val;
          });
          // console.log(result)
          dispatch(actions.loadCourseListData(result));
        },
        error => {
          console.log(error);
        }
      );
    };
  },
  loadCourseListData: data => ({
    type: types.LOAD_COURSE_LIST_DATA,
    data
  }),
  resetPageData: () => ({
    type: types.RESET_PAGE_DATA
  }),
  loadNextData: () => ({
    type: types.NEXT_PAGE_DATA
  })
};

//Reducer
//管理 reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_COURSE_LIST_DATA:
      let count = state.data.length;
      let loadMore = action.data.length - count > state.page_size ? true : false;
      let data = state.data.concat(action.data.slice(count, state.page_size + count));
      // console.log(loadMore, action.data.length, count, state.page_size, data)
      return { ...state, data: data, loadMore: loadMore };
    case types.NEXT_PAGE_DATA:
      return { ...state, page: state.page + 1 };
    case types.RESET_PAGE_DATA:
      return { ...state, page: 1, data:[]};
    default:
      return state;
  }
};

export default reducer;

//seletor
export const getCourse = state => {
  return state.course.data;
};
export const getLoadMoreStatus = state => {
  return state.course.loadMore;
};
