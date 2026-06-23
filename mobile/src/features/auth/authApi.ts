import { api } from '../../services/api';

export interface LoginRequest {
  email: string;
  passwordHash: string;
}

export interface AuthResponse {
  accessToken: string;
  role: 'ADMIN' | 'STAFF' | 'STUDENT';
  userId: number;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
