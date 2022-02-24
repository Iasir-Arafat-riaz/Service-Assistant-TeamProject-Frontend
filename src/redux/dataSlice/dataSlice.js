import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Swal from 'sweetalert2';
import firebaseInit from "./../../firebase/firebase.init";

firebaseInit();

const initialState = {
    user: {},
    loading: true,
    postLoad: false,
    isAdmin: false,
    allServices: [],
    serviceIsLoading: false,
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    singleServiceLoading: true,
    singleServiceDetails: [],
    testimonials: [],
    testimonialLoading: true
}

// async task


export const saveUserToDb = createAsyncThunk(
    'saveUserToDb/user',
    async (info) => {
        const response = await axios.post(`https://fierce-meadow-12011.herokuapp.com/users/register`, info);
        return response.data
    }
)
export const putUserToDb = createAsyncThunk(
    'data/putUserToDb',
    async (info) => {
        const response = await axios.put(`https://fierce-meadow-12011.herokuapp.com/users/register `, info);
        return response.data
    }
)
export const makeAdmin = createAsyncThunk(
    'data/userAdmin',
    async (info) => {
        const response = await axios.put(`https://fierce-meadow-12011.herokuapp.com/admin/makeadmin/${info.email} `, info);
        return response.data
    }
)
export const isAdmin = createAsyncThunk(
    'data/isAdmin',
    async (info) => {
        const response = await axios.get(` https://fierce-meadow-12011.herokuapp.com/admin/checkadmin/${info.email}`);
        return response.data
    }
)

export const loadServiceCategory = createAsyncThunk(
    "loadServiceCategory/data",
    async () => {
        const response = await fetch(
            "https://fierce-meadow-12011.herokuapp.com/services"
        ).then((res) => res.json());
        return response;
    }
);

export const singleService = createAsyncThunk(
    "singleService/details",
    async () => {
        const response = await axios.get("https://fierce-meadow-12011.herokuapp.com/singleservice")
        return response.data;
    }
);

export const websiteReviews = createAsyncThunk(
    "testimonials/data",
    async () => {
        const response = await axios.get("https://fierce-meadow-12011.herokuapp.com/reviews")
        return response.data;
    }
)

export const deleteTestimonial = createAsyncThunk(
    "testimonial/delete",

    async (info) => {
        const response = await axios.delete(`http://localhost:5000/reviews/${info.id}`).then(() => {
            Swal.fire(
                'Deleted',
                'This testimonial has been deleted',
                'success'
            )
        })
        return response.data;
    }
)

export const approvedTestimonial = createAsyncThunk(
    "approvetestimonial/approved",
    async (info) => {
        const response = await axios.put(`http://localhost:5000/reviews/${info.id}`).then(() => {
            Swal.fire(
                'Approved!',
                'This testimonial has been approved',
                'success'
            )
        })
        return response.data;
    }
);



export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = null
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
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
    extraReducers: (builder) => {
        builder
            .addCase(makeAdmin.fulfilled, (state, action) => {

            })
            .addCase(isAdmin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(isAdmin.fulfilled, (state, action) => {
                state.isAdmin = action.payload.admin
                state.loading = false;
            })
            .addCase(isAdmin.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(loadServiceCategory.pending, (state, action) => {
                state.serviceIsLoading = true;
            })
            .addCase(loadServiceCategory.fulfilled, (state, { payload }) => {
                state.serviceIsLoading = false;
                state.allServices = payload;
            })
            .addCase(loadServiceCategory.rejected, (state, { payload }) => {
                console.log(payload);
            })
            .addCase(singleService.pending, (state, action) => {
                state.singleServiceLoading = true;
            })
            .addCase(singleService.fulfilled, (state, { payload }) => {
                state.singleServiceLoading = false;
                state.singleServiceDetails = payload;
            })
            .addCase(websiteReviews.pending, (state, action) => {
                state.testimonialLoading = true;
            })
            .addCase(websiteReviews.fulfilled, (state, { payload }) => {
                state.testimonials = payload;
                state.testimonialLoading = false;
            })
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, setLoading, addToCart } = dataSlice.actions
export const allData = (state) => state.data;
export default dataSlice.reducer