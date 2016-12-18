import {Component} from 'react';

import Nav from 'layouts/nav/Nav.js'

import style from './Frame.scss';

export default class extends Component{
    render(){
        return (
            <div className={style.wrap}>
                <header className={`${style.header}`}>
                    <Nav />
                </header>
                {this.props.children}
            </div>
        );
    }
}
