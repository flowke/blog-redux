
export default class extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
        this.onChange = this.onChange.bind(this);
    }
    onChange(ev){
        let value = ev.target.value;
        let { onChange, data } = this.props;
        this.setState({ value });
        onChange(data.token, value);
    }
    render(){
        let {data, wrongMsg} = this.props;
        let { placeholder, name, fontIcon, type} = data;
        let {value} = this.state;
        return(
            <div className={`field ${ wrongMsg ? 'error': ''}`}>
                {wrongMsg?<label className="">{wrongMsg}</label>:""}
                <div className="ui left icon input fluid">
                    <i className={`icon ${fontIcon}`}></i>
                    <input type={type}
                        onChange={this.onChange}
                        name={name||''}
                        placeholder={placeholder}
                        value = {value}
                    />
                </div>
            </div>
        );
    }
}
