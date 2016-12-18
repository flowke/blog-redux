
export default class extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }
    onChange(token,ev){
        let value = ev.target.value;
        this.setState({ value });
        this.props.onChange(token, value);
    }
    render(){
        let {data, valiData} = this.props;
        let { placeholder, name, fontIcon, type, token} = data;
        let {hintClass, wrongMsg} = valiData;
        let {value} = this.state
        return(
            <div className={`form-group ${hintClass}`}>
                <div className="input-group input-group-lg">
                    <div className="input-group-addon">
                        <span className={`glyphicon ${fontIcon}`}></span>
                    </div>
                    <input type={type}
                        onChange={this.onChange.bind(this,token)}
                        className={`form-control`}
                        name={name||''}
                        placeholder={placeholder}
                        value = {value}
                    />
                </div>
                {wrongMsg?<span className="help-block">{wrongMsg}</span>:""}
            </div>
        );
    }
}
