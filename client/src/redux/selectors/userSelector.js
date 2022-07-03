import { createSelector } from '@reduxjs/toolkit';


export const getUserById = (state, userId) => {
	state.getUsers.users.find((user) => user.id === userId)
}

export const getUser = () => createSelector([getUserById], (user) => user)
