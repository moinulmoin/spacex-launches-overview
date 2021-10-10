import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        searchInput: '',
        successCheckbox: false,
        failedCheckbox: false,
        upcomingCheckbox: false,
    },
    reducers: {
        handleSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        handleSuccessCheckbox: (state) => {
            state.successCheckbox = !state.successCheckbox;
            state.upcomingCheckbox = false;
        },
        handleFailedCheckbox: (state) => {
            state.failedCheckbox = !state.failedCheckbox;
            state.upcomingCheckbox = false;
        },
        handleUpcomingCheckbox: (state) => {
            state.upcomingCheckbox = !state.upcomingCheckbox;
            state.successCheckbox = false;
            state.failedCheckbox = false;
        },
    },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice.reducer;
