import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  name: "",
  email: ""
}
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action) {
      state.push(action.payload)
    },
    userUpdated(state, action) {
      const { id, name, email } = action.payload
      const existingUser = state.find(user => user.id === id)
      if (existingUser) {
        existingUser.name = name
        existingUser.email = email
      }
    }
  }
})

export const { userAdded, userUpdated } = usersSlice.actions

export default usersSlice.reducer