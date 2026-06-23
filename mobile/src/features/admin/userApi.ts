import { api } from '../../services/api';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'STAFF' | 'STUDENT';
  isActive: boolean;
}

export interface PaginatedUserResponse {
  content: User[];
  totalPages: number;
  totalElements: number;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedUserResponse, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    reactivateUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}/reactivate`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
    softDeleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useReactivateUserMutation,
  useSoftDeleteUserMutation,
} = userApi;
