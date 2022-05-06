import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  province: "",
  name: "",
}
export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.province = action.payload.province
      state.name = action.payload.name
    },
    unSetUserInfo: (state, action) => {
      state.province = action.payload.province
      state.name = action.payload.name
    },
  }
})

export const { setUserInfo, unSetUserInfo } = userSlice.actions
export default userSlice.reducer