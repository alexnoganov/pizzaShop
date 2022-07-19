import {ICartItems} from '../store/slices/cartSlice';

export const calcTotalPrice = (items: ICartItems[]) => {
    return items.reduce((sum, item) => sum + item.price * item.count, 0);
};