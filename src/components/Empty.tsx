import {Link} from 'react-router-dom';

function Empty({title, text, button = false}:{
    title: string;
    text: string | JSX.Element;
    button?: boolean;
}): JSX.Element {
    return (<>
        <h2>{title} <span>😕</span></h2>
        <p>{text}</p>
        <img src="/img/empty-cart.png" alt="Empty cart"/>
        {button && <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
        </Link>}
    </>);
}

export default Empty;