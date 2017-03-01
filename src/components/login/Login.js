import style from './Panel.scss';
import Button from './ButtonUnit.js';
import Input from './InputUnit.js';
import Validator from 'util/validation.js';
import config from 'config/config.json';

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            successType: '',
            hasSubmitSuccess: false
        }

        this.validator = new Validator();

        this.onChange = this.onChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);

    }

    formSubmit(ev){
        ev.stopPropagation();
        ev.preventDefault();

        let data = this.getSubmitData();

        let hasValid = this.valiData(data);

        if( hasValid === true ){
            this.doRequest(data);
        }
    }
    // 获取提交的数据
    // 会根据是注册还是登录返回不同的数据
    getSubmitData(){
        let {form} = this.refs,
            isLogin = this.props;

        let data = null;

        if(isLogin){
            data = {
                username: form.username.value,
                passw: form.passw.value
            }
        }else{
            data = {
                username:form.username.value,
                passw: form.passw.value,
                cfpassw: form.cfpassw.value
            }
        }

        return data;
    }
    // 验证数据,
    // 数据可能是用户登录的, 可能是用于注册的
    // 返回bool
    valiData(data){
        let valiData = null;
        let state = null;

        // 改变loginRedux的state
        let {changeState} = this.props;

        if(this.props.isLogin){
            valiData = data;
        }else{
            valiData = {...data,
                cfpassw : [data.passw, data.cfpassw]
            }
        }

        this.validator.valiByValue(valiData,(name, msg)=>{
            state[name] = {
                wrongMsg: msg
            }
        });

        if(state !== null){
            changeState('all',state);
            return false;
        }else{
            return true;
        }

    }

    doRequest(data){
        let {isLogin, doLogin, doSignup} = this.props;

        if(isLogin){
            doLogin(`${config.url}/home/user/login`, data);
        }else{
            doSignup(`${config.url}/home/user/signup`, data);
        }

    }

    onChange(token, value){

        let {changeState} = this.props;

        let wrongMsg = this.valiByOneStep(token, value);

        if(wrongMsg){
            this.changeWrongMsgState(token, wrongMsg);
        }

        if(this.props.resWrong){
            changeState('resWrong','');
        }
    }

    valiByOneStep(token, value){
        let wrongMsg = '';
        this.validator.valiOneByValue(token, value, (msg)=>{
            wrongMsg = msg;
        })
        return wrongMsg;
    }

    changeWrongMsgState(token, wrongMsg){
        let {changeState} = this.props;
        changeState(token, {wrongMsg});
    }


    componentDidMount(){
        this.validator.addByValue('username',[
            {strategy: 'isEmpty', errorMsg:'用户名不能为空'},
            {strategy: 'hasSpace', errorMsg:'不能有空格'},
            {strategy: 'isNumberHead', errorMsg:'不能数字开头'},
            {strategy: 'mustAllW', errorMsg:'用户名只能由字母,数字,下划线( _ )组成'},
            {strategy: 'maxLength:16', errorMsg:'不能超过12位'}
        ]);
        this.validator.addByValue('passw',[
            {strategy: 'isEmpty', errorMsg:'密码不能为空'},
            {strategy: 'hasSpace', errorMsg:'不能有空格'},
        ]);
        this.validator.addByValue('cfpassw',[
            {strategy: 'equal', errorMsg:'密码不一致'}
        ]);

    }

    render(){
        let {username, passw, cfpassw, changeState, isLogin, resWrong, isPending} = this.props;

        let { successType } = this.state;

        let wrongClass = resWrong ? 'error':'';

        let pendingClass = isPending ? 'loading' : '';

        let signSuccess = !!successType;

        return(
            <div>
                <form className={`ui form ${signSuccess?'success':''} ${wrongClass} ${pendingClass} ${style.form}`}
                    onSubmit={this.formSubmit}
                    ref='form'
                    role="form"
                >

                    {
                        signSuccess
                        ?
                        (<div className="ui success message">
                            <div className="header">注册成功</div>
                            <p>即将自动登陆</p>
                        </div>)
                        : ''
                    }

                    <div className="ui error message">
                        <div className="header">错误</div>
                        <p>{resWrong}</p>
                    </div>

                    <Input
                        data={{
                            type: 'text',
                            placeholder: 'User Name',
                            name: 'username',
                            fontIcon: 'user',
                            token: 'username'
                        }}
                        wrongMsg={username.wrongMsg}
                        onChange={this.onChange}
                    />

                    <Input
                        data={{
                            type: 'password',
                            placeholder: 'Password',
                            name: 'passw',
                            fontIcon: 'unlock alternate',
                            token: 'passw'
                        }}
                        wrongMsg={passw.wrongMsg}
                        onChange={this.onChange}
                    />
                    {
                        isLogin ? ''
                        :
                            <Input
                                data={{
                                    type: 'password',
                                    placeholder: 'Confirm Password',
                                    name: 'cfpassw',
                                    fontIcon: 'lock',
                                    token: 'cfpassw'
                                }}
                                wrongMsg={cfpassw.wrongMsg}
                                onChange={this.onChange}
                            />
                    }
                    <Button
                        value={isLogin? "Login": 'Sign up'}
                    />
                </form>
            </div>
        );
    }
}
