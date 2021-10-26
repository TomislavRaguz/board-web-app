import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiFetch } from '../../lib';
import { IUser } from '../slices/api'

export const initialize = createAsyncThunk(
  'app/init', 
  async () => {  
    const response = await apiFetch('/api/v1/auth/me', { method: "GET" })
    return response;
  }
)

export const login = createAsyncThunk(
  'auth/login', 
  async (payload: { email: string, password: string }) => {
    try {
      const response = await apiFetch('/api/v1/auth/login', { body: payload })
      return response;
    } catch(e) {
      console.log(e)
      throw e
    }
  }
)
export const signup = createAsyncThunk(
  'auth/signup', 
  async (payload: { email: string, password: string }) => {  
    const response = await apiFetch('/api/v1/auth/signup', { body: payload })
    return response;
  }
)
export const logout = createAsyncThunk(
  'auth/logout', 
  async () => {  
    const response = await apiFetch('/api/v1/auth/logout')
    return response;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    user: null as null | IUser
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signup.pending, state => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(initialize.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null
      })
  }
})

export default authSlice.reducer