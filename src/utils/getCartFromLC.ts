import {calcTotalPrice} from './calcTotalPrice';
import {ICartItems} from '../store/slices/cartSlice';

export const getCartFromLC = () => {
    const data = localStorage.getItem('cart');
    if (data) {
        const items:ICartItems[] = JSON.parse(data);
        const totalPrice = calcTotalPrice(items);
        return {
            items,
            totalPrice,
        };
    } else {
        return {
            items: [],
            totalPrice: 0,
        };
    }
};