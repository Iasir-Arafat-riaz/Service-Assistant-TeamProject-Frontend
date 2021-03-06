import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
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
                toast.info("Increased Service Quantity", {
                    position:"bottom-left"
                })
            }
            else {
                const tempService = { ...action.payload, cartQuantity: 1 }
                // state.cartItems.push(action.payload)
                state.cartItems.push(tempService)
                toast.success("Added to Cart", {
                    position:"bottom-left"
                })
            }
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;