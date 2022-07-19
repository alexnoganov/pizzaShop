import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCartFromLC} from '../../utils/getCartFromLC';
import {calcTotalPrice} from '../../utils/calcTotalPrice';

const isEqual = require('lodash.isequal');

export interface ICartItems {
    id: string;
    img: string;
    title: string;
    type: string;
    size: number;
    price: number;
    count: number;
    delete: boolean;
}

export interface ICart {
    items: ICartItems[];
    totalPrice: number;
}

const initialState: ICart = getCartFromLC();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizza(state, action: PayloadAction<ICartItems>) {
            const findItem = state.items.find(item => item.id === action.payload.id
                && item.type === action.payload.type
                && item.size === action.payload.size);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice += action.payload.price;
        },
        removePizza(state, action: PayloadAction<ICartItems>) {
            const findItem = state.items.find(item => item.id === action.payload.id
                && item.type === action.payload.type
                && item.size === action.payload.size);
            if (findItem && findItem.count > 1 && !action.payload.delete) {
                findItem.count--;
            } else {
                state.items = state.items.filter(item => !isEqual(item, findItem));
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const {addPizza, removePizza, clearCart} = cartSlice.actions;

export default cartSlice.reducer;