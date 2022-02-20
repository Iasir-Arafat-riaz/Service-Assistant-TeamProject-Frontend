import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import firebaseInit from "./../../firebase/firebase.init";

firebaseInit();

const initialState = {
    user: {},
    loading: true,
    postLoad: false,
    isAdmin: false,
    allServices: [],
    serviceIsLoading: false,
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
        const response = await axios.put(`  `, info);
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
        console.log(info);
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
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, setLoading, } = dataSlice.actions
export const allData = (state) => state.data;
export default dataSlice.reducer