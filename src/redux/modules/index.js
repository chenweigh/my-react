import { combineReducers } from 'redux';

import home from './home'
import category from './category'
import course from './course' 
import login from "./login"
import loading from './loading'
import tip from './tip'
import toast from './toast'
import confirm from './confirm'
import team from './team'
import student from './student'

//合并成根 reducer
const rootReducer = combineReducers({
    loading,
    tip,
    toast,
    confirm,
    home,
    category,
    course,
    login,
    team,
    student,
})
export default rootReducer