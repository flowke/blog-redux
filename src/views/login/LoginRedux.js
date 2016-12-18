//  更多起到整合分发作用
// 这个文件显然包含了 login 页面所有的 reducer 和 actionCreator
// 引入 reducer 以及 actionCreator
import { combineReducers } from 'redux';

// 引入 reducer,
import valiState from 'components/login/LoginRedux.js';

// 导出所有 action
export { changeState } from 'components/login/LoginRedux.js';

//  默认导出所有 reducer
export default combineReducers({
    valiState
});
