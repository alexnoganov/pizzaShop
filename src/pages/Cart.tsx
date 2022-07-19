import cn from 'classnames';
import Empty from '../components/Empty';
import NonEmptyCart from '../components/NonEmptyCart';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {ICartItems} from '../store/slices/cartSlice';

function Cart() {
    const items = useSelector<RootState>(state => state.cart.items) as ICartItems[];

    return (
        <div className="container container--cart">
            <div className={cn('cart', {'cart--empty': items.length === 0})}>
                {items.length > 0
                    ? (<NonEmptyCart/>)
                    : <Empty title="Корзина пустая"
                             text={(<>Вероятней всего, вы не заказывали ещё пиццу.<br/>
                                 Для того, чтобы заказать пиццу, перейди на главную страницу.</>)}
                             button/>}
            </div>
        </div>
    );
}

export default Cart;