import {Component} from 'react';

import style from './Frame.scss';

export default class extends Component{
    render(){
        return (
            <div className={`${style.bd}`}>
                <div className={`ui grid padded ${style.grid}`}>
                    {this.props.children}
                </div>

            </div>
        );
    }
}
