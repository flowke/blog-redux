
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import TwoColFrame from 'layouts/frame/TwoColFrame.js';
import Info from 'layouts/info/Info.js';
import Wrapper from 'components/login/Wrapper.js';
import LoginPanel from 'components/login/Login.js';

import { changeState, doLogin } from './LoginRedux.js';

import * as navActions from 'layouts/nav/NavRedux.js';

class Login extends React.Component{

    render(){
        let {changeState, push, valiState, navActions, doLogin} = this.props;

        return (
            <TwoColFrame>
                <Info tit="登陆">
                    <Wrapper
                        isLogin={true}
                        push={push}
                    >
                        <LoginPanel
                            isLogin={true}
                            {...valiState}
                            changeState={changeState}
                            push={push}
                            doLogin={doLogin}
                            {...navActions}
                        />
                    </Wrapper>
                </Info>
            </TwoColFrame>
        );
    }
}

export default connect( state => ({
    valiState: state.login.loginState
}) , dispatch => ({
    changeState: bindActionCreators(changeState, dispatch),
    doLogin: bindActionCreators(doLogin, dispatch),
    push: bindActionCreators(push,dispatch),
    navActions: bindActionCreators(navActions, dispatch)
})  )(Login);
