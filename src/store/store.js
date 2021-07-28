import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../features/counter/CouterSlice';

export default configureStore({
    reducer:{
        counter: counterReducer,
    },
})