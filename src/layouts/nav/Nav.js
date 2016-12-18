import { PropTypes, Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import style from './Nav.scss';
import * as navAction from './NavRedux.js';

import config from 'config/config.json';

const propTypes = {
};

class Nav extends Component{

    reDirect(token,ev){

        let {push, navActions, navState} = this.props;
        let {hasLogin} = navState;

        let {changeLoginState, changeView, changeNavAll } = navActions;

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
                    push('/write');
                }else{
                    push('/login');
                }
                break;
            case 'login':
                if(hasLogin){

                    $.post(`${config.url}/home/user/logout`);

                    changeLoginState(false);
                }else{
                    push('/login');
                }

        }
    }

    componentDidMount(){
        $('[data-toggle="tooltip"]').tooltip({trigger:'hover'});

        let {changeLoginState} = this.props.navActions;

        $.post(`${config.url}/home/user/autoLog`)
        .done((data)=>{
            let{code} = data;

            if(code===0){
                console.log(code)
                changeLoginState(true);

            }
        })
    }

    componentUillUnmount(){

        $('[data-toggle="tooltip"]').off();

    }

    render(){
        let {hasLogin, whichView } = this.props.navState;

        let {active, userAct} = style;

        return(
            <nav className={` ${style.nav}`} role="navigation">
                <div className={`${style.collection1}`} id="bs-example-navbar-collapse-1">
                    <ul className={`${style.navList} ${style.top} `}>
                        <li className={whichView === 'home'? active: ''}
                            onClick = {this.reDirect.bind(this,'home')}
                        >
                            <span href="#" className={`${style.brand} `}>F</span>
                        </li>
                        <li
                            className={whichView==='inbox'? active: ''}
                            onClick = {this.reDirect.bind(this,'inbox')}
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Inbox"
                            ref="inbox">
                            <span className={`glyphicon glyphicon-inbox`}></span>
                        </li>
                        <li
                            className={whichView==='write'? active: ''}
                            onClick = {this.reDirect.bind(this,'write')}
                            data-toggle="tooltip"
                            data-placement="right"
                            title="写文章"
                            ref="write"
                        >
                            <span className={`glyphicon glyphicon-pencil`}></span>
                        </li>
                    </ul>
                    <ul className={`${style.navList} ${style.bottom}`}>
                        <li
                            className={whichView === 'userEntry'? userAct:''}
                            onClick = {this.reDirect.bind(this, 'login')}
                            data-toggle="tooltip"
                            data-placement="right"
                            data-original-title={hasLogin ? '注销':'登录'}
                            ref="login">
                            <span
                                className={`glyphicon ${hasLogin?'glyphicon-log-in':'glyphicon-user'}`}>
                            </span>

                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Nav.propTypes = propTypes;

export default connect(state=>({
    navState: state.nav
}), dispatch=>({
    navActions: bindActionCreators(navAction, dispatch),
    push: bindActionCreators(push,dispatch)
}))(Nav);
