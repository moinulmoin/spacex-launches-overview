/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getLaunches = createAsyncThunk('launches/getLaunches', async (dispatch, getState) => {
    const data = await fetch('https://api.spacexdata.com/v3/launches').then((res) => res.json());
    return data;
});

const launchesSlice = createSlice({
    name: 'launches',
    initialState: {
        launches: [],
        isError: false,
        isLoading: false,
    },
    extraReducers: {
        [getLaunches.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getLaunches.fulfilled]: (state, action) => {
            state.launches = action.payload;
            state.isLoading = false;
        },
        [getLaunches.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
        },
    },
});

export default launchesSlice.reducer;
