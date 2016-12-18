import {Component} from 'react';
import style from './style.scss';
export default class extends Component{
    render(){
        return(
            <div>
                <header >
                    <h2 className="page-header">写文章</h2>
                </header>
                <div className="bdWrap">
                    <from className="form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="标题"
                                />
                            </div>

                        </div>
                        <div className="form-group">
                            <div className="col-sm-4">
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" placeholder="打上吧标签"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <textarea
                                    rows="16"
                                    className="form-control"
                                >

                                </textarea>
                            </div>
                        </div>
                        <button type="submit"
                            className={"btn btn-success "+ style.btn}
                        >发布文章</button>
                        <button
                            type="submit"
                            className={"btn btn-primary "+ style.btn}
                        >保存草稿</button>
                    </from>
                </div>
            </div>
        )
    }
}
