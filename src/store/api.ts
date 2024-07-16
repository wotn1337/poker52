import { LoseConsalation } from "@/models/LoseConsalation";
import { Quote } from "@/models/Quote";
import {
  BaseUser,
  CreateUserResponse,
  CreateUserParams,
  UpdatedUser,
} from "@/models/User";
import { WinCongratulation } from "@/models/WinCongratulation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tags = ["User"];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "api/" }),
  tagTypes: tags,
  endpoints: (builder) => ({
    getUsers: builder.query<BaseUser[], void>({
      query: () => ({ url: "users", method: "GET" }),
      providesTags: tags,
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserParams>({
      query: (body) => ({ url: "users", method: "POST", body }),
      invalidatesTags: tags,
    }),
    updateUser: builder.mutation<BaseUser, UpdatedUser>({
      query: ({ _id, ...body }) => ({
        url: `users/${_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: tags,
    }),
    deleteUser: builder.mutation<boolean, string>({
      query: (id) => ({ url: `users/${id}`, method: "DELETE" }),
      invalidatesTags: tags,
    }),
    getRandomQuote: builder.query<Quote, void>({
      query: () => ({ url: "quotes", method: "GET" }),
    }),
    getRandomWinCongratulation: builder.query<WinCongratulation, void>({
      query: () => ({ url: "winCongratulations", method: "GET" }),
    }),
    getRandomLoseConsalation: builder.query<LoseConsalation, void>({
      query: () => ({ url: "loseConsalations", method: "GET" }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetRandomQuoteQuery,
  useLazyGetRandomWinCongratulationQuery,
  useLazyGetRandomLoseConsalationQuery,
} = apiSlice;
