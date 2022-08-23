import { createSlice } from '@reduxjs/toolkit'

export const routeSlice = createSlice({
  name: 'route',
  initialState: {
    routeInfo: {
      name: '',
      route1: '',
      route2: '',
    },
  },
  reducers: {
    update: (state, action) => {
      state.routeInfo.name = action.payload.name
      state.routeInfo.route1 = action.payload.route1
      state.routeInfo.route2 = action.payload.route2
    },
  },
})
export const { update } = routeSlice.actions
export default routeSlice.reducer
