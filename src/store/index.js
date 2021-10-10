import { configureStore } from '@reduxjs/toolkit';
import filersReducer from './flitersSlice';
import launchesReducer from './launchesSlice';

const store = configureStore({
    reducer: {
        launches: launchesReducer,
        filters: filersReducer,
    },
});

export default store;
