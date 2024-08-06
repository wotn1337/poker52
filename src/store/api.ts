import { Card } from "@/models/Card";
import { LoseConsalation } from "@/models/LoseConsalation";
import { Quote } from "@/models/Quote";
import {
  BaseUser,
  CreateUserResponse,
  CreateUserParams,
  UpdatedUser,
  FullUser,
  UpdateScoreMutationType,
  UploadAvatar,
} from "@/models/User";
import { WinCongratulation } from "@/models/WinCongratulation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tags = ["User"];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: tags,
  endpoints: (builder) => ({
    getUser: builder.query<FullUser, string>({
      query: (id) => ({ url: `users/${id}`, method: "GET" }),
      providesTags: (_, __, id) => [{ type: "User", id }],
    }),
    getUsers: builder.query<BaseUser[], void>({
      query: () => ({ url: "users", method: "GET" }),
      providesTags: tags,
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserParams>({
      query: (body) => ({ url: "users", method: "POST", body }),
      invalidatesTags: tags,
      transformErrorResponse: (error) => error.data,
    }),
    updateUser: builder.mutation<BaseUser, UpdatedUser>({
      query: ({ _id, ...body }) => ({
        url: `users/${_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { _id }) => [{ type: "User", id: _id }],
    }),
    updateUserScore: builder.mutation<BaseUser, UpdateScoreMutationType>({
      query: ({ _id, score }) => ({
        url: `users/${_id}/updateScore`,
        method: "PATCH",
        body: score,
      }),
      invalidatesTags: tags,
    }),
    uploadAvatar: builder.mutation<FullUser, FormData>({
      query: (body) => ({
        url: `users/${body.get("id")}/avatar`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, body) => [
        { type: "User", id: body.get("id")?.toString() },
      ],
    }),
    deleteAvatar: builder.mutation<FullUser, string>({
      query: (id) => ({
        url: `users/${id}/avatar`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation<boolean, string>({
      query: (id) => ({ url: `users/${id}`, method: "DELETE" }),
      invalidatesTags: tags,
    }),
    getRandomQuote: builder.query<Quote, Date>({
      query: () => ({ url: "quotes", method: "GET" }),
    }),
    getRandomWinCongratulation: builder.query<WinCongratulation, Date>({
      query: () => ({ url: "winCongratulations", method: "GET" }),
    }),
    getRandomLoseConsalation: builder.query<LoseConsalation, Date>({
      query: () => ({ url: "loseConsalations", method: "GET" }),
    }),
    getCardOfTheDay: builder.query<Card, Date>({
      query: () => ({ url: "cards/cardOfTheDay", method: "GET" }),
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
  useGetUserQuery,
  useUpdateUserScoreMutation,
  useGetCardOfTheDayQuery,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = apiSlice;
