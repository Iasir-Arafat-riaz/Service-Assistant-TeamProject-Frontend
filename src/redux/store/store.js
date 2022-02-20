import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Reducers/cartSlice";
import serviceCategorySlice from "../Reducers/reducersSagar/servicesSlice";

const store = configureStore({
  reducer: {
    serviceCategoryState: serviceCategorySlice,
    cart: cartReducer
  },
});

export default store;
