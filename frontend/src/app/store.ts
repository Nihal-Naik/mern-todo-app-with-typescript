import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/loginSlice'
import signupReducer from '../features/signupSlice'

export const store = configureStore({
  reducer: {login:loginReducer,signup:signupReducer},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch