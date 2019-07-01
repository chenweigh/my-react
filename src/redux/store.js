import { createStore, applyMiddleware } from "redux";  //redux 状态管理
import thunk from "redux-thunk";                       //redux-thunk 用于处理异步 action 中间件
import rootReducer from "./modules";

let store;

//process 环境变量。开发环境下集成，为了性能考虑
if (
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;
