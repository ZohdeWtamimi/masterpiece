import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
  };

  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart:(state,action) =>{
        const item =action.payload
        // const res = state.cartItems.map(e => e.id ==item.id ? state.cartItems.push({...item, quantity:1}): )
        const res = state.cartItems.find(e => e.id ==item.id)
        if(!res){
            state.cartItems.push({...item, quantity:1})
            state.amount++;
        }else{
            const index = state.cartItems.indexOf(res)
            // console.log()
            state.cartItems[index].quantity++
        }
        state.total += item.productPrice;
      },
      clearCart: (state) => {
        state.cartItems = [];
      },
      removeItem: (state, action) => {
        const itemPay = action.payload;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemPay.id);
        state.total = state.total - (itemPay.productPrice * itemPay.quantity)
        state.amount = state.amount - 1;
      },
      increase: (state, { payload }) => {
        const cartItem = state.cartItems.find((item) => item.id === payload.id);
        cartItem.amount = cartItem.amount + 1;
      },
      decrease: (state, { payload }) => {
        const cartItem = state.cartItems.find((item) => item.id === payload.id);
        cartItem.amount = cartItem.amount - 1;
      },
      calculateTotals: (state) => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * item.price;
        });
        state.amount = amount;
        state.total = total;
      },
    }
  });

export const { addToCart ,clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;