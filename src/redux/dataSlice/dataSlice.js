import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import firebaseInit from "./../../firebase/firebase.init";

firebaseInit();

const initialState = {
    user: {},
    loading: true,
    postLoad: false,
    sideBarLoad: false,
    isAdmin: false,
    allRequestPost: [],
    allApprovePost: [],
    blogs: [],
    count: 0,
    pageCount: 0,
    profileToggle: false,
    cheapTopRate: [],
    adminLastBlog: [],
}

// async task


export const saveUserToDb = createAsyncThunk(
    'saveUserToDb/user',
    async (info) => {
        const response = await axios.post(`https://serene-temple-54072.herokuapp.com/user`, info);
        return response.data
    }
)
export const putUserToDb = createAsyncThunk(
    'data/putUserToDb',
    async (info) => {
        const response = await axios.put(`https://serene-temple-54072.herokuapp.com/user`, info);
        return response.data
    }
)
export const makeAdmin = createAsyncThunk(
    'data/userAdmin',
    async (info) => {
        const response = await axios.put(`https://serene-temple-54072.herokuapp.com/user/makeAdmin`, info);
        return response.data
    }
)
export const isAdmin = createAsyncThunk(
    'data/isAdmin',
    async (info) => {
        const response = await axios.get(`https://serene-temple-54072.herokuapp.com/user/${info.email}`);
        return response.data
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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setPostLoad: (state, action) => {
            state.postLoad = action.payload;
        },
        resetBlogs: (state, action) => {
            state.blogs = [];
        },
        handleProfileToggle: (state, action) => {
            state.profileToggle = !state.profileToggle;
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, setLoading, handleProfileToggle, resetBlogs, setPostLoad } = dataSlice.actions
export const selectData = (state) => state.data;
export default dataSlice.reducer