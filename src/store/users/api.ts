import {
  BaseUser,
  CreateUserResponse,
  CreateUserParams,
  UpdatedUser,
} from "@/models/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tags = ["User"];

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "api/users" }),
  tagTypes: tags,
  endpoints: (builder) => ({
    getUsers: builder.query<BaseUser[], void>({
      query: () => ({ url: "", method: "GET" }),
      providesTags: tags,
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserParams>({
      query: (body) => ({ url: "", method: "POST", body }),
      invalidatesTags: tags,
    }),
    updateUser: builder.mutation<BaseUser, UpdatedUser>({
      query: ({ _id, ...body }) => ({ url: `/${_id}`, method: "PATCH", body }),
      invalidatesTags: tags,
    }),
    deleteUser: builder.mutation<boolean, string>({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: tags,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
