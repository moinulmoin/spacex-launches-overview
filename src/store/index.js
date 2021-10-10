import { configureStore } from '@reduxjs/toolkit';
import launchesReducer from './launchesSlice';

const store = configureStore({
    reducer: {
        launches: launchesReducer,
    },
});

export default store;
