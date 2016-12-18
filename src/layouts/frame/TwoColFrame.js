import {Component} from 'react';

import style from './Frame.scss';

export default class extends Component{
    render(){
        return (
            <div className={`container-fluid ${style.bd}`}>
                {this.props.children}
            </div>
        );
    }
}
