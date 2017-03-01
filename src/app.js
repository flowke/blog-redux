
require('semantic-ui/dist/semantic.min.css');

require('style/main.scss');
import "babel-polyfill";
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory} from 'react-router';

import config from 'config/config.json';

import routes from 'routers/index.js';
import configureStore from 'reduxs/configureStore.js'
import DevTools from 'reduxs/DevTools.js';

const store = configureStore();


const history = syncHistoryWithStore(browserHistory, store);

$.ajaxSetup({
    dataType:'json',
    xhrFields: {withCredentials: true}
});

export {store};

ReactDOM.render((
    <Provider store={store}>
        {routes(history)}
    </Provider>
), document.querySelector('#root'));
