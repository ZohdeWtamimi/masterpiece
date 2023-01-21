import { configureStore } from "@reduxjs/toolkit";
import product from './ProductSlice';
import dashboard from './DashboardSlice';

export default configureStore({
    reducer:{
        product,
        dashboard
    }
})
