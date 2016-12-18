
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import OneColFrame from 'layouts/frame/OneColFrame.js';
import Info from 'layouts/info/Info.js';
import Wrapper from 'components/login/Wrapper.js';
import LoginPanel from 'components/login/Login.js';


import { changeState } from './LoginRedux.js';

import * as navActions from 'layouts/nav/NavRedux.js';

 class Login extends React.Component{


    render(){
        let {changeState, push, valiState} = this.props;

        return (
            <OneColFrame>
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
                            {...this.props.navActions}
                        />
                    </Wrapper>
                </Info>
            </OneColFrame>
        );
    }
}

export default connect( state => ({
    valiState: state.login.valiState
}) , dispatch => ({
    changeState: bindActionCreators(changeState, dispatch),
    push: bindActionCreators(push,dispatch),
    navActions: bindActionCreators(navActions, dispatch)
})  )(Login);
