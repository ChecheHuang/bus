import { configureStore } from '@reduxjs/toolkit'
import routeSlice from './routeSlice'
export default configureStore({
  reducer: {
    route: routeSlice,
  },
})
