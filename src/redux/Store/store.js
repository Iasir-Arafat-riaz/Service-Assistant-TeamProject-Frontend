import { configureStore } from "@reduxjs/toolkit";
import serviceCategorySlice from "../Reducers/reducersSagar/servicesSlice";

const store = configureStore({
  reducer: {
    serviceCategoryState: serviceCategorySlice,
  },
});

export default store;
