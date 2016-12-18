
require('bootstrap');
require('bower_components/bootstrap/dist/css/bootstrap.min.css');
require('style/main.scss');

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory} from 'react-router';

import config from 'config/config.json'

import routes from 'routers/index.js';
import configureStore from 'reduxs/configureStore.js'
import DevTools from 'reduxs/DevTools.js';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

$.ajaxSetup({
    dataType:'json',
    xhrFields: {withCredentials: true}
});

ReactDOM.render((
    <Provider store={store}>
        {routes(history)}
    </Provider>
), document.querySelector('#root'));
