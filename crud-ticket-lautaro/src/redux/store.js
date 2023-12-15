import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from './slices/ticketsSlice'

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
})

export default store;