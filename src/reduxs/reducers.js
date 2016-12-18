// 汇总了整个应用的 reducer, 直接汇总 views 下的 *.Redux.js 默认导出的 reducer 即可(因为在 view 下已经汇总过一次)

import login from 'views/login/LoginRedux.js';
import signin from 'views/login/SigninRedux.js';
import nav from 'layouts/nav/NavRedux.js';

export default {
    login,
    signin,
    nav
}
