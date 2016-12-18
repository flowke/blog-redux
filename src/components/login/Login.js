import style from './Panel.scss';
import Button from './ButtonUnit.js';
import Input from './InputUnit.js';
import Validator from 'util/validation.js';
import config from 'config/config.json';

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.validator = new Validator();

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.canSubmit = true;
    }

    handleSubmit(ev){
        ev.stopPropagation();
        ev.preventDefault();
        let form = ev.target;
        let {isLogin, changeState, push, changeNavAll} = this.props;
        let username = {
            hintClass: '',
            wrongMsg: ''
        },
            passw = Object.assign({}, username),
            cfpassw = Object.assign({}, username);

        let valiData = isLogin ? {username, passw} : {username, passw, cfpassw};

        let submitData = {
            username: form.username.value,
            passw: form.passw.value
        }
        if(!isLogin){
            submitData = Object.assign({},submitData, {
                cfpassw: form.cfpassw.value
            });
        }


        let {canSubmit} = this;

        this.validator.valiByValue({
            username: form.username.value,
            passw: form.passw.value
        },(name,msg)=>{
            valiData[name] = {
                hintClass: 'has-error',
                wrongMsg: msg
            }
            canSubmit = false;
        });

        if(!isLogin && (form.passw.value !== form.cfpassw.value) ){
            valiData.cfpassw = {
                hintClass: 'has-error',
                wrongMsg: '密码不一致'
            }
            canSubmit = false;
        }

        changeState('all',valiData);

        let url = isLogin ? `${config.url}/home/user/login` : `${config.url}/home/user/signin`;

        if(canSubmit){
            $.post(url,submitData)
            .done((data)=>{
                let {code, msg} = data;
                let wrongState = {
                    hintClass : 'has-error',
                    wrongMsg: msg
                };

                if(isLogin){
                    if(code===0){
                        changeNavAll({
                            hasLogin: true,
                            whichView: 'home'
                        });
                        push('/')
                    }else if(code===1){
                        changeState('username', wrongState);
                    }else if(code===2){
                        changeState('passw',wrongState);
                    }
                }else{
                    if(code===0){
                        push('/')
                        changeNavAll({
                            hasLogin: true,
                            whichView: 'home'
                        });
                    }else if(code===1){
                        changeState('username',{
                            hintClass: 'has-error',
                            wrongMsg: '注册失败,可能用户名已存在'
                        })
                    }
                }
                this.canSubmit = true;
            });
        }

    }

    onChange(token, value){
        let {changeState} = this.props ;

        let data = {
            hintClass: '',
            wrongMsg: ''
        }

        if(token !== 'cfpassw'){

            this.validator.valiOneByValue(token, value,(msg)=>{
                data.hintClass = 'has-error';
                data.wrongMsg = msg;
            });
        }

        changeState(token, data);
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
    }

    render(){
        let {username, passw, cfpassw, changeState, isLogin} = this.props;
        return(
            <div>
                <form className={style.form} onSubmit={this.handleSubmit} role="form">
                    <Input
                        data={{
                            type: 'text',
                            placeholder: 'User Name',
                            name: 'username',
                            fontIcon: 'glyphicon-user',
                            token: 'username'
                        }}
                        valiData={username}
                        onChange={this.onChange}
                    />
                    <Input
                        data={{
                            type: 'password',
                            placeholder: 'Password',
                            name: 'passw',
                            fontIcon: 'glyphicon-lock',
                            token: 'passw'
                        }}
                        valiData={passw}
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
                                    fontIcon: 'glyphicon-lock',
                                    token: 'cfpassw'
                                }}
                                valiData={cfpassw}
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
