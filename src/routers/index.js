
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Frame from 'layouts/frame/Frame.js';
import Home from 'views/home/Home.js';
import Inbox from 'views/inbox/Inbox.js';
import Login from 'views/login/Login.js';
import Signin from 'views/login/Signin.js';
import Write from 'views/write/Write.js';

export default (browserHistory) => (
    <Router history={browserHistory}>
        <Route path="/" component={Frame}>
            <IndexRoute component={Home} ></IndexRoute>
            <Route path="/inbox" component={Inbox}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/write" component={Write}></Route>
        </Route>
    </Router>
);
