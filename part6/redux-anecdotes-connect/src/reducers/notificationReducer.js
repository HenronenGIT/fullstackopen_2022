import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		putNotification(state, action) {
			state = action.payload
			return state
		},
		resetNotification(state) {
			state = null
			return state
		},
	}
})

export const { voteNotification, addNotification, putNotification, resetNotification } = notificationSlice.actions

// For reseting setTimeour() timer
let timeoutID

export const setNotification = (msg, time) => {
	clearTimeout(timeoutID)
	const milliSeconds = time * 1000
	return async dispatch => {
		dispatch(putNotification(msg))
		timeoutID = setTimeout(() => {
			dispatch(resetNotification())
		}, milliSeconds)
	}

}

export default notificationSlice.reducer
