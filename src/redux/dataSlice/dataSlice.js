import { async } from '@firebase/util';
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
    allChat: [],
    serviceProviderLoading: true,
    orderInfo: {},
    selectedService: {},
    reviewIndex: 0,
    providerEmail: {},
    notifications: [],
    notificationLoading: true,
    notificationCount: 0,
    approvdedLoading: true,
    deleteLoading: true,

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
        //console.log(info);
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
        const response = await axios.delete(`https://fierce-meadow-12011.herokuapp.com/reviews/${info.id}`)
        return response.data;
    }
)

export const approvedTestimonial = createAsyncThunk(
    "approvetestimonial/approved",
    async (info) => {
        const response = await axios.put(`https://fierce-meadow-12011.herokuapp.com/reviews/${info.id}`)
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
export const postChat = createAsyncThunk(
    "chat/postChat",
    async (info) => {
        const response = await axios.post('https://fierce-meadow-12011.herokuapp.com/chat', info)
        return response.data;
    }
);
export const getChatFromDb = createAsyncThunk(
    "chat/postChat",
    async (info) => {
        const response = await axios.get(`https://fierce-meadow-12011.herokuapp.com/chat`);
        return response.data;
    }
);


export const saveService = createAsyncThunk(
    "service/save",
    async (info) => {
        //console.log(info)
        const response = await axios.post('https://fierce-meadow-12011.herokuapp.com/saveservice', info)
        return response.data;
    }
);

export const getNotification = createAsyncThunk(
    "get/notification",
    async (info) => {
        // console.log(info)
        const response = await axios.get(`https://dry-sea-00611.herokuapp.com/notification/getnotification?email=${info.email}`)
        return response.data;
    }
)

export const updateMessageStatus = createAsyncThunk("update/notificationstatus",
    async (info) => {
        const response = await axios.put(`https://dry-sea-00611.herokuapp.com/notification/statuschange/${info.email}`)
        return response.data;
    }
)
export const sendNotification = createAsyncThunk("sendNotification/notification",
    async (info) => {
        const modifyInfo = { ...info, seen: false, time: new Date() }
        console.log(modifyInfo);
        const response = await axios.post(`https://dry-sea-00611.herokuapp.com/notification`, modifyInfo)
        return response.data;
    }
)

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
        remaingTestimonials: (state, { payload }) => {
            state.testimonials = state.testimonials.filter((item) => item._id !== payload)
        },
        deleteTestimonails: (state, { payload }) => {
            state.testimonials = state.testimonials.filter((item) => item._id !== payload)
        },
        addOrderInfo: (state, { payload }) => {
            state.orderInfo = payload;
        },
        selectedServiceAndProvider(state, { payload }) {
            state.selectedService = payload;
        },
        addChat: (state, { payload }) => {
            state.allChat = [...state.allChat, payload];
        },
        changeUserPosition: (state, { payload }) => {
            //console.log(payload);
            const uid = payload?.uid;
            const getUser = state.allUser.filter(user => user.uid === uid)[0];
            const withoutUser = state.allUser.filter(user => user.uid !== uid);
            state.allUser = [getUser, ...withoutUser]
        },
        reviewServiceIndex: (state, { payload }) => {
            state.reviewIndex = payload;
        },
        parentServiceId: (state, { payload }) => {
            state.providerEmail = payload;
        },

        newNotification: (state, { payload }) => {
            state.notifications = [payload, ...state.notifications]
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(makeAdmin.fulfilled, (state, action) => {
                //console.log('doen');
            })
            .addCase(isAdmin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(isAdmin.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user.role = action.payload.role
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
                //console.log(payload);
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

            .addCase(getChatFromDb.fulfilled, (state, { payload }) => {
                if (payload.length) {
                    state.allChat = payload
                }
            })
            .addCase(getNotification.pending, (state, { payload }) => {
                state.notificationLoading = true;
            })
            .addCase(getNotification.fulfilled, (state, { payload }) => {
                state.notifications = payload.reverse();
                state.notificationLoading = false;
            })
            .addCase(sendNotification.fulfilled, (state, { payload }) => {
                console.log('done');
                console.log(payload);
                if (state.user.email === payload.email) {
                    state.notifications.push(payload)
                }
            })
            .addCase(sendNotification.pending, (state, { payload }) => {
                console.log('pending');
            })
            .addCase(sendNotification.rejected, (state, { payload }) => {
                console.log('rejected');
            })
            .addCase(deleteTestimonial.pending, (state, { payload }) => {
                state.deleteLoading = true;
            })
            .addCase(deleteTestimonial.fulfilled, (state, { payload }) => {
                state.deleteLoading = false;
            })
            .addCase(approvedTestimonial.pending, (state, { payload }) => {
                state.approvdedLoading = false;
            })
            .addCase(approvedTestimonial.fulfilled, (state, { payload }) => {
                state.approvdedLoading = true;
            })

    },
})


export const { login, logout, setLoading, addToCart, addOrderInfo, changeRole, selectedServiceAndProvider, reviewServiceIndex, parentServiceId, addChat, changeUserPosition, setNotificationCount, newNotification, remaingTestimonials, deleteTestimonails } = dataSlice.actions
export const allData = (state) => state.data;
export default dataSlice.reducer