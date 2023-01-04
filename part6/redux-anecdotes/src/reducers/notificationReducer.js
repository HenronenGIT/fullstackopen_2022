import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		voteNotification(state, action) {
			state = `you voted '${action.payload}'`
			return state
		},
		addNotification(state, action) {
			state = `You added '${action.payload}'`
			return state
		},
		resetNotification(state) {
			state = null
			return state
		}
	}
})

export const { voteNotification, addNotification } = notificationSlice.actions
export default notificationSlice.reducer
