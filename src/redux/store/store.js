import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../dataSlice/dataSlice'

export const store = configureStore({
    reducer: {
        data: dataReducer
    },
})