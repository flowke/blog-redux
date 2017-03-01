import {Component} from 'react';
import style from './style.scss';
export default class extends Component{

    componentDidMount(){
        $('#writeArtical.ui.dropdown').dropdown({
        });
    }
    componentWillUnmount(){
        $('#writeArtical.ui.dropdown').off();
    }

    render(){
        return(
            <div className="sixteen wide column">
                <header className="ui header dividing">
                    <h1>写文章</h1>
                </header>
                <from className="ui form">
                    <div className="field">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="标题"
                        />
                    </div>
                    <div className="fields">
                        <div className="field five wide column required">
                            <div className="ui selection dropdown" id="writeArtical">
                                <input type="hidden" name="album"/>
                                <div className="default text">选择一个专题</div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    <div className="ui button input fluid positive">添加</div>

                                    <div className="item" data-value="0">react</div>
                                    <div className="item" data-value="1">js基础</div>
                                    <div className="item" data-value="2">node.js</div>
                                </div>
                            </div>

                        </div>
                        <div className="field eleven wide column">
                            <input type="text" className="" placeholder="打上吧标签"/>
                        </div>
                    </div>
                    <div className="field">
                        <textarea
                            rows="16"
                            className=""
                            placeholder="暂时只支持 markdown 语法. . ."
                        >
                        </textarea>
                    </div>
                    <div className="ui buttons">
                        <button type="submit"
                            className={"ui button primary"}
                        >发布文章</button>
                        <div className="or"></div>
                        <button
                            type="submit"
                            className={"ui button positive "}
                        >保存草稿</button>
                    </div>

                </from>
            </div>
        )
    }
}
