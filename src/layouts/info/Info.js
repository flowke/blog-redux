import {PropTypes, Component} from 'react'

import style from './Info.scss';

let propTypes = {
    tit: PropTypes.string.isRequied
}

export default class Info extends Component{

    render(){
        let {tit, children} = this.props
        return (
            <section className={`col-lg-4 ${style.section}`}>
                <header className={`${style.header}`}><h2 className={`page-header`}>{tit}</h2></header>
                <div className={`${style.wrap}`}>
                    {children}
                </div>
            </section>
        );
    }


}
