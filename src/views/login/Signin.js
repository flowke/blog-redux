import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import TwoColFrame from 'layouts/frame/TwoColFrame.js';
import Info from 'layouts/info/Info.js';
import Wrapper from 'components/login/Wrapper.js';
import LoginPanel from 'components/login/Login.js';

import { changeState } from './SigninRedux.js';

 class Signin extends React.Component{

    render(){
        let {changeState, push, valiState} = this.props;
        console.log(valiState)
        return (
            <TwoColFrame>
                <Info tit="注册">
                    <Wrapper
                        push={push}
                        isLogin={false}
                    >
                        <LoginPanel
                            isLogin={false}
                            changeState={changeState}
                            {...valiState}
                            push={push}
                        />
                    </Wrapper>
                </Info>
            </TwoColFrame>
        );
    }
}

export default connect( state => ({
    valiState: state.signin.valiState
}) , dispatch => ({
    changeState: bindActionCreators(changeState, dispatch),
    push: bindActionCreators(push,dispatch)
})  )(Signin);
