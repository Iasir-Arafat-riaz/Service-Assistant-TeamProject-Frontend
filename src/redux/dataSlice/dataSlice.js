import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

import Swal from 'sweetalert2';
import firebaseInit from "./../../firebase/firebase.init";

firebaseInit();
// cartItems: localStorage.getItem('cartItems')
// ? JSON.parse(localStorage.getItem('cartItems'))
// : [],

const initialState = {
    user: {},
    loading: true,
    getLoad: false,
    allServices: [],
    allUser: [],
    serviceIsLoading: false,
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    singleServiceLoading: true,
    singleServiceDetails: [],
    testimonials: [],
    testimonialLoading: true,
    providers: [],
    serviceProviderLoading: true,
    orderInfo: {},
    selectedService: {},
    reviewIndex: 0
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
    'data/makeAdmin',
    async (info) => {
        console.log(info);
        const response = await axios.put(`https://fierce-meadow-12011.herokuapp.com/admin/makeadmin/${info.email} `, info);
        return response.data
    }
)
export const isAdmin = createAsyncThunk(
    'data/isAdmin',
    async (info) => {
        const response = await axios.get(`https://fierce-meadow-12011.herokuapp.com/admin/checkadmin/${info.email}`);
        return response.data
    }
)
export const getAllUser = createAsyncThunk(
    'data/getAllUser',
    async (info) => {
        const response = await axios.get(`https://fierce-meadow-12011.herokuapp.com/users/allusers`);
        return response.data
    }
)


export const loadServiceCategory = createAsyncThunk(
    "loadServiceCategory/data",
    async () => {
        const response = await fetch(
            "http://localhost:5000/services"
        ).then((res) => res.json());
        return response;
    }
);

export const singleService = createAsyncThunk(
    "singleService/details",
    async () => {
        const response = await axios.get("http://localhost:5000/singleservice")
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
        const response = await axios.delete(`https://fierce-meadow-12011.herokuapp.com/reviews/${info.id}`).then(() => {
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
        const response = await axios.put(`https://fierce-meadow-12011.herokuapp.com/reviews/${info.id}`).then(() => {
            Swal.fire(
                'Approved!',
                'This testimonial has been approved',
                'success'
            )
        })
        return response.data;
    }
);

export const serviceProviders = createAsyncThunk(
    "providers/service",
    async () => {
        const response = await axios.get('https://fierce-meadow-12011.herokuapp.com/users/finding/ids', {
            params: {
                data: [
                    "62121eb1cef8c7b4915a6923",
                    "6211cbf6bb809e9e3edb1859"
                ]
            }
        })
        return response.data;
    }
);

export const saveService = createAsyncThunk(
    "service/save",
    async (info) => {
        console.log(info)
        const response = await axios.post('https://fierce-meadow-12011.herokuapp.com/saveservice', info)
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
        changeRole: (state, { payload }) => {
            const email = payload.email;
            const role = payload.role;
            state.allUser.find(data => data.email === email)['role'] = role;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addToCart(state, { payload }) {
            state.cartItems.push(payload);
            // //We need item id for find index effectively. Need modify API
            // const itemIndex = state.cartItems.findIndex((item) => item.Price === action.payload.Price);

            // if (itemIndex >= 0) {
            //     state.cartItems[itemIndex].cartQuantity += 1;
            //     toast.info(`Increased ${state.cartItems[itemIndex].Name} Quantity`, {
            //         position: "bottom-left"
            //     })
            // }
            // else {
            //     const tempService = { ...action.payload, cartQuantity: 1 }
            //     // state.cartItems.push(action.payload)
            //     state.cartItems.push(tempService)
            //     toast.success(`${action.payload.Name} Added to Cart`, {
            //         position: "bottom-left"
            //     });
            // }
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            saveService(state.cartItems);
        },
        addOrderInfo: (state, { payload }) => {
            state.orderInfo = payload;
        },
        selectedServiceAndProvider(state, { payload }) {
            state.selectedService = payload;
        },
        reviewServiceIndex: (state, { payload }) => {
            state.reviewIndex = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(makeAdmin.fulfilled, (state, action) => {
                console.log('doen');
            })
            .addCase(isAdmin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(isAdmin.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = { ...state.user, role: action.payload.admin ? 'admin' : 'user' }
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
            .addCase(serviceProviders.pending, (state, { payload }) => {
                state.serviceProviderLoading = true;
            })
            .addCase(serviceProviders.fulfilled, (state, { payload }) => {
                state.serviceProviderLoading = false;
                state.providers = payload;
            })
            .addCase(getAllUser.pending, (state, { payload }) => {
                state.getLoad = true;
            })
            .addCase(getAllUser.rejected, (state, { payload }) => {
                state.getLoad = false;
            })
            .addCase(getAllUser.fulfilled, (state, { payload }) => {
                state.allUser = payload;
                state.getLoad = false;
            })
    },
})

// Action creators are generated for each case reducer function

export const { login, logout, setLoading, addToCart, addOrderInfo, changeRole, selectedServiceAndProvider, reviewServiceIndex } = dataSlice.actions
export const allData = (state) => state.data;
export default dataSlice.reducer