import {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {push} from 'react-router-redux';

import WriteComponent from 'components/write/Write.js';
import OneColFrame from 'layouts/frame/OneColFrame.js';

class Write extends Component{
    render(){
        return(
            <OneColFrame>
                <WriteComponent/>
            </OneColFrame>

        )
    }
}

export default connect()(Write);
