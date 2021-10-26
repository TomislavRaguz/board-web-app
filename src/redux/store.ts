import { createSlice, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { apiSlice } from './slices/api'
import { authSlice } from './slices/auth'
import { combineReducers } from 'redux'
import { normalizrSlice } from './slices/normalizr/normalizrSlice'

const appReducer = combineReducers({
  auth: authSlice.reducer,
  normalizr: normalizrSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const userChangeDetectionMiddleware = (store:any) => (next:any) => (action:any) => {
  const user = store.getState().auth.user
  let result = next(action)
  const nextUser = store.getState().auth.user
  if(user && !nextUser || (user && user.email !== nextUser.email)) {
    store.dispatch({ type: 'auth/userChange' })
  }
  return result
}

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/userChange") {
    /*
    resets RTK query cache, could also do it in a middleware on user change because 
    what if a user is logged in and another one logs in
    */
    console.log('purging user data')
    return appReducer({ ...state, api: undefined, normalizr: {} }, action)
  }
  return appReducer(state, action);
};
export const reduxStore = configureStore({
  reducer: rootReducer,
  /*{
    auth: authSlice.reducer,
    app: appSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }*/
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userChangeDetectionMiddleware, apiSlice.middleware),
})
export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

declare global {
  type RootState = ReturnType<typeof reduxStore.getState>
}

declare module 'react-redux' {
  interface DefaultRootState extends RootState { }
}
