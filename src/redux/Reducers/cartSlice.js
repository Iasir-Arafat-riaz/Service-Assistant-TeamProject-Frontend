import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            //We need item id for find index effectively. Need modify API
            const itemIndex = state.cartItems.findIndex((item) => item.Price === action.payload.Price);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            }
            else {
                const tempService = { ...action.payload, cartQuantity: 1 }
                // state.cartItems.push(action.payload)
                state.cartItems.push(tempService)
            }
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;