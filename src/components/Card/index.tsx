import styles from './Card.module.scss';
import {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {addPizza, ICart, ICartItems} from '../../store/slices/cartSlice';
import {RootState, useAppDispatch} from '../../store/store';
import {IItems} from '../../store/slices/pizzaSlice';

const Card: FC<IItems> = ({id, imageUrl, title, types, sizes, price}) => {
    const {items: cart} = useSelector<RootState, ICart>(state => state.cart);

    const count = cart.reduce((count, item) => count + (item.id === id.toString() ? item.count : 0), 0);


    const [activeType, setActiveType] = useState<number>(types[0]);
    const [activeSize, setActiveSize] = useState<number>(sizes[0]);

    const dispatch = useAppDispatch();

    const onItemClick = () => {
        const item:ICartItems = {
            id,
            title,
            img: imageUrl,
            price,
            type: (activeType ? 'традиционное' : 'тонкое'),
            size: activeSize,
            count: 0,
            delete: false
        };
        dispatch(addPizza(item));
        // const {data} = await axios.post('https://629c9802e9358232f75d5dc3.mockapi.io/cart', item);
        // dispatch(addPizza(data));
    };

    return (
        <div className={styles.pizzaBlock}>
            <img
                className={styles.pizzaBlockImage}
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className={styles.pizzaBlockTitle}>{title}</h4>
            <div className={styles.pizzaBlockSelector}>
                <ul>
                    {types.map(type => (
                        <li key={type}
                            onClick={() => setActiveType(type)}
                            className={activeType === type ? styles.active : ''}>{type ? 'традиционное' : 'тонкое'}</li>
                    ))}
                </ul>
                <ul>
                    {sizes.map(size => (
                        <li key={size}
                            onClick={() => setActiveSize(size)}
                            className={activeSize === size ? styles.active : ''}>{size} см.</li>
                    ))}
                </ul>
            </div>
            <div className={styles.pizzaBlockBottom}>
                <div className={styles.pizzaBlockPrice}>от {price} ₴</div>
                <div onClick={onItemClick}
                     className="button button--outline button--add">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {count !== 0 && <i>{count}</i>}
                </div>
            </div>
        </div>
    );
};

export default Card;