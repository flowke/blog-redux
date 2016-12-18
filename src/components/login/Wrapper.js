import style from './Panel.scss';
export default ({isLogin, push, children})=>{

    return (
        <section className={`${style.section}`}>
            <header className={`${style.header}`}>
                <span
                    className={isLogin ? 'text-primary' : 'text-muted'}
                    onClick = {push.bind(null,'/login')}
                > 登陆 </span>·
                <span
                    className={isLogin ? 'text-muted' : 'text-primary'}
                    onClick={push.bind(null,'/signin')}
                > 注册 </span>
            </header>
            {children}
        </section>
    );
}
