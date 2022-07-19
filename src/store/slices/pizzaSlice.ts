import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export interface IItems {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export interface IPizza {
    items: IItems[];
    status: 'loading' | 'success' | 'error';
}

const initialState: IPizza = {
    items: [],
    status: 'loading',
};

export const fetchPizza = createAsyncThunk<IItems[], string>('pizza/fetchPizza', async (params) => {
    const {data} = await axios.get(`https://629c9802e9358232f75d5dc3.mockapi.io/items${params}`);
    return data;
});

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action:PayloadAction<IItems[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPizza.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        });
        builder.addCase(fetchPizza.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
    },
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;