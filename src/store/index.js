import { configureStore } from "@reduxjs/toolkit";
import product from './ProductSlice';
import dashboard from './DashboardSlice';
import cart from "./CartSlice";

export default configureStore({
    reducer:{
        product,
        dashboard,
        cart
    }
})
