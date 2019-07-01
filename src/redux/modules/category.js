/**
 * 课程分类数据管理
 */
import { get } from "../../utils/request";
import url from "../../utils/url";
import {reloadAction} from '../../utils'

const initialState = {
  //分类数据
  page:1,
  page_size:10,
  pk: null, //当前选中分类的 pk
  index: 0, //当前选中分类的下标
  name:'', //当前选中分类的名称
  data: [] //分类数据源
};

//Actions Type 类型名称定义
export const types = {
  //分类相关 types
  //获取直播课程分类请求成功
  FETCH_LIVE_COURSE_CATEGORY_SUCCESS: "HOME/FETCH_LIVE_COURSE_CATEGORY_SUCCESS",
  //设置当前分类
  SET_CURRENT_CATEGORY: "HOME/SET_CURRENT_CATEGORY"
};

//Actions
export const actions = {
  //异步 action
  fetchLiveCourseCategory: () => {
    return (dispatch, getState) => {
      const category = getState().category;
      const {page, page_size} = category;
      const requestUrl = url.getLiveCourseCategory();
      return get(requestUrl).then(
        data => {
          dispatch(actions.loadLiveCourseCategorySuccess(data));
        },
        error => {}
      );
    };
  },
  loadLiveCourseCategorySuccess: data => ({
    type: types.FETCH_LIVE_COURSE_CATEGORY_SUCCESS,
    data
  }),
  setCurrentCategory: (category, index, this__) => {
    return (dispatch, getState) => {
      dispatch(actions.setCurrentCategory1(category, index)); //发送 action 更新分类
      reloadAction(dispatch, getState, this__);
    };
  },
  setCurrentCategory1: (category, index) => ({
    type: types.SET_CURRENT_CATEGORY,
    category,
    index
  })
};

//Reducer (收到 Action，处理 State，并返回新 State)
//分类reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LIVE_COURSE_CATEGORY_SUCCESS:
      //todo
      let data = action.data.reverse();
      let pk = data.length > 0 ? data[0]["pk"] : null;
      let name = data.length > 0 ? data[0]["name"] : '';
      return { ...state, data: state.data.concat(data), pk: pk, name:name };
    case types.SET_CURRENT_CATEGORY:
      return { ...state, index: action.index, pk: action.category.pk, name:action.category.name }; //方式 1
    // return Object.assign({}, state, {               //方式 2
    //   selectCategory:action.index
    // })
    default:
      return state;
  }
};
export default reducer;

//selector
export const getCategorys = state => state.category.data;
export const getSelectCategoryIndex = state => state.category.index;
export const getSelectCategoryPk = state => state.category.pk;
export const getSelectCategoryName = state => state.category.name;
