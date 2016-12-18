import style from './Preview.scss';

export default ({data})=>{
    let { title, user, time, read, comment, like } = data;
    return(
        <section className={`${style.section}`}>
            <header>
                <span>{user}</span> · {time}
            </header>
            <h4 className={`${style.title}`}>{title}</h4>
            <footer >
                阅读 {read} 评论 {comment} · 喜欢 {like}
            </footer>
        </section>
    );
}
