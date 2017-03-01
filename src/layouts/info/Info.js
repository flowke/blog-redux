import {PropTypes, Component} from 'react'

import style from './Info.scss';

let propTypes = {
    tit: PropTypes.string.isRequied
}

export default class Info extends Component{

    render(){
        let {tit, children} = this.props
        return (
            <section className={`ui five wide column ${style.section}`}>
                <h1 className={`ui dividing header`}>{tit}</h1>
                <div className={`${style.wrap}`}>
                    {children}
                </div>
            </section>
        );
    }


}
