import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterPayload = {
    category: number;
    sortBy: 'rating' | 'title' | 'price';
    page: number;
}

export interface IFilter {
    category: number;
    sort: 'rating' | 'title' | 'price';
    search: string;
    currentPage: number;
}


const initialState:IFilter = {
    category: 0,
    sort: 'rating',
    search: '',
    currentPage: 1,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCategory(state, action:PayloadAction<number>) {
            state.category = action.payload;
        },
        setSearch(state, action:PayloadAction<string>) {
            state.search = action.payload;
        },
        setCurrentPage(state, action:PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action:PayloadAction<FilterPayload>) {
            state.sort = action.payload.sortBy;
            state.category = action.payload.category;
            state.currentPage = action.payload.page;
        },
    },
});

export const {setCategory, setSort, setSearch, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;