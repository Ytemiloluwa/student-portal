import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken, clearToken } from '../../app/storage';

interface AuthState {
  token: string | null;
  role: 'ADMIN' | 'STAFF' | 'STUDENT' | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; role: 'ADMIN' | 'STAFF' | 'STUDENT' }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      setToken(action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      clearToken();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
