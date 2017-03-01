import { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import style from './Nav.scss';
import * as navAction from './NavRedux.js';
import {changeState as changeLoginState} from 'components/login/LoginRedux.js';
import config from 'config/config.json';

const propTypes = {
};

class Nav extends Component{

    reDirect(token,ev){

        let {push, navActions, navState, changeLoginState, loginState} = this.props;
        let {hasLogin} = loginState;

        let {changeView, changeNavAll } = navActions;

        ev.stopPropagation();
        ev.preventDefault();
        switch(token){
            case 'home':
                push('/');
                break;
            case 'inbox':
                push('/inbox');
                break;
            case 'write':

                if(hasLogin){
                    push('/user/write');
                }else{
                    push('/user/login');
                }
                break;
            case 'userCenter':
                push('/user/center')
                break;
            case 'login':
                if(hasLogin){

                    $.post(`${config.url}/home/user/logout`);
                    push('/');
                    changeLoginState('hasLogin',false);
                }else{
                    push('/user/login');
                }
        }
    }

    componentDidMount(){

        let {changeLoginState} = this.props;

        $.post(`${config.url}/home/user/autoLog`)
        .done((data)=>{
            let{code} = data;

            if(code===0){
                changeLoginState('hasLogin',true);
            }
        })
    }

    componentWillUnmount(){


    }

    render(){
        let {hasLogin, whichView } = this.props.navState;

        let {active, userAct} = style;

        return(
            <nav className={` ${style.nav}`} role="navigation">
                <ul className={`${style.navList} ${style.top} `}>
                    <li className={whichView === 'home'? active: ''}
                        onClick = {(ev)=>{this.reDirect('home',ev)}}
                    >
                        <span href="#" className={`${style.brand} `}>F</span>
                    </li>
                    <li
                        className={whichView==='inbox'? active: ''}
                        onClick = {(ev)=>{this.reDirect('inbox',ev)}}
                        data-tooltip="归档"
                        data-position="right center"
                        data-inverted=""
                        data-variation="tiny"
                        title="Inbox"
                        ref="inbox">
                        <i className={`icon archive`}></i>
                    </li>
                    <li
                        className={whichView==='write'? active: ''}
                        onClick = {(ev)=>{this.reDirect('write',ev)}}
                        data-tooltip="写文章"
                        data-position="right center"
                        data-inverted=""
                        title="写文章"
                        ref="write"
                    >
                        <i className={`icon write`}></i>
                    </li>
                </ul>
                <ul className={`${style.navList} ${style.bottom}`}>
                    {
                        hasLogin
                        ?[
                            <li
                                className={whichView === 'userInfo'? userAct:''}
                                onClick = {(ev)=>{this.reDirect('userInfo',ev)}}
                                data-tooltip={"个人中心"}
                                data-position="right center"
                                data-inverted=""
                                key="userInfo"
                            ><i className="icon user"></i></li>,
                        <li
                            className={whichView === 'like'? userAct:''}
                            onClick = {(ev)=>{this.reDirect('like',ev)}}
                            data-tooltip={"喜欢"}
                            data-position="right center"
                            data-inverted=""
                            key="like"
                        ><i className="icon heart"></i></li>,
                        <li
                            className={whichView === 'bookmark'? userAct:''}
                            onClick = {(ev)=>{this.reDirect('bookmark',ev)}}
                            data-tooltip={"收藏"}
                            data-position="right center"
                            data-inverted=""
                            key="bookmark"
                        ><i className="icon bookmark"></i></li>,
                        <li
                            className={whichView === 'announcement'? userAct:''}
                            onClick = {(ev)=>{this.reDirect('announcement',ev)}}
                            data-tooltip={"消息"}
                            data-position="right center"
                            data-inverted=""
                            key="announcement"
                        ><i className="icon announcement"></i></li>
                        ]
                        :
                        ""
                    }
                    <li
                        className={whichView === 'userEntry'? userAct:''}
                        onClick = {(ev)=>{this.reDirect('login',ev)}}
                        data-tooltip={hasLogin ? '注销':'登录'}
                        data-position="right center"
                        data-inverted=""
                        ref="login">
                        <i
                            className={`icon ${hasLogin?'sign out':'sign in'}`}>
                        </i>
                    </li>
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = propTypes;

export default connect(state=>({
    navState: state.nav,
    loginState: state.login
}), dispatch=>({
    navActions: bindActionCreators(navAction, dispatch),
    changeLoginState: bindActionCreators(changeLoginState, dispatch),
    push: bindActionCreators(push,dispatch)
}))(Nav);
