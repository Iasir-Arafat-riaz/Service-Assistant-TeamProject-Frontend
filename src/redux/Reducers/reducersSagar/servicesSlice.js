import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allServices: [],
  serviceIsLoading: true,
};

// load data from backend

export const loadServiceCategory = createAsyncThunk(
  "serviceCategorySlice/lodaServiceData",
  async () => {
    const response = await fetch(
      "https://dry-sea-00611.herokuapp.com/services"
    ).then((res) => res.json());
    //
    return response;
  }
);

const serviceCategorySlice = createSlice({
  name: "serviceCategory",
  initialState: initialState,
  reducers: {
    turnOffLoading: (state) => {
      state.serviceIsLoading = !state.serviceIsLoading;
    },
  },
  extraReducers: {
    [loadServiceCategory.pending]: (state, action) => {
      state.serviceIsLoading = true;
    },
    [loadServiceCategory.fulfilled]: (state, { payload }) => {
      state.serviceIsLoading = false;
      state.allServices = payload;
    },
    [loadServiceCategory.rejected]: (state, { payload }) => {
      //
    },
  },
});

export const { turnOffLoading } = serviceCategorySlice.actions;

export default serviceCategorySlice.reducer;
