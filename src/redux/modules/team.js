/**
 * 班级数据管理
 */
import { get } from "../../utils/request";
import url from "../../utils/url";

const initialState = {
  data: [],
  pk: null,
  page:1,
  page_size:10,
};

export const types = {
  LOAD_TEAM: "TEAM/LOAD_TEAM",
  SET_CURRENT_TEAM: "TEAM/SET_CURRENT_TEAM"
};

export const actions = {
  fetchTeamList: (callback) => {
    return (dispatch, getState) => {
      const team = getState().team;
      const {page, page_size} = team;
      const category_pk = getState().category.pk;
      const requestUrl = url.getListTeamList(category_pk, page, page_size);
      return get(requestUrl).then(
        data => {
          // console.log("网络请求", data);
          dispatch(actions.loadTeam(data));
          if(callback){callback();}
        },
        error => {}
      );
    };
  },
  loadTeam: data => ({
    type: types.LOAD_TEAM,
    data
  }),
  setCurrentTeam: pk => ({
    type: types.SET_CURRENT_TEAM,
    pk
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_TEAM: {
      let data = action.data;
      let final_data = state.data.concat(data);
      let current_pk = state.pk ? state.pk : final_data[0].pk;
      return { ...state, data: final_data, pk: current_pk };
    }
    case types.SET_CURRENT_TEAM:
      return { ...state, pk: action.pk };
    default:
      return state;
  }
};
export default reducer;

export const getTeamList = state => state.team.data;
export const getCurrentTeamPK = state => state.team.pk;
