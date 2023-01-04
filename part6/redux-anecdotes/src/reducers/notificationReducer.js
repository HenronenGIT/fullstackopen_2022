import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Initial State of the Notification'

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
})

export default notificationSlice.reducer
