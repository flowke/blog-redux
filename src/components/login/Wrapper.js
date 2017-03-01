import style from './Panel.scss';
export default ({isLogin, push, children})=>{

    return (
        <section className={`${style.section}`}>
            <header className={`${style.header}`}>
                <span
                    className={isLogin ? 'text-blue' : 'text-grey'}
                    onClick = {push.bind(null,'/user/login')}
                > 登陆 </span>·
                <span
                    className={isLogin ? 'text-grey' : 'text-blue'}
                    onClick={push.bind(null,'/user/signin')}
                > 注册 </span>
            </header>
            {children}
        </section>
    );
}
