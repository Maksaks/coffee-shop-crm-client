import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './slice/admin.slice'
import baristaReducer from './slice/barista.slice'

export const store = configureStore({
	reducer: {
		barista: baristaReducer,
		admin: adminReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
