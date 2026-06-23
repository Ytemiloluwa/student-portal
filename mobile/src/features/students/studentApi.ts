import { api } from '../../services/api';

export interface Student {
  id: number;
  userId: number;
  studentNumber: string;
  dateOfBirth?: string;
  phone?: string;
  address?: string;
  departmentCode: string;
  degreeType: 'U' | 'P';
  enrollmentYear: number;
  enrollmentDate: string;
}

export interface EnrollStudentRequest {
  email: string;
  firstName: string;
  lastName: string;
  departmentCode: string;
  degreeType: 'U' | 'P';
  enrollmentYear: number;
}

// Minimal mocked paginated response
export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export const studentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<PaginatedResponse<Student>, void>({
      query: () => '/students',
      providesTags: ['Student'],
    }),
    getStudentById: builder.query<Student, number>({
      query: (id) => `/students/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Student', id }],
    }),
    getStudentMe: builder.query<Student, void>({
      query: () => '/students/me',
      providesTags: ['Student'],
    }),
    enrollStudent: builder.mutation<Student, EnrollStudentRequest>({
      query: (data) => ({
        url: '/students',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
    updateStudentMe: builder.mutation<Student, Partial<Student>>({
      query: (data) => ({
        url: '/students/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const { 
  useGetStudentsQuery, 
  useGetStudentByIdQuery, 
  useGetStudentMeQuery, 
  useEnrollStudentMutation,
  useUpdateStudentMeMutation 
} = studentApi;
