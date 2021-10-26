import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { normalize, schema } from 'normalizr'
import { mergeEntities } from './normalizr/normalizrSlice'
import { reduxStore } from '../store'
import { BoardN, ColumnN } from './normalizr/schemas'

const tagMongoOne = <T extends string>(type: T) => (result: any) => result ? [{ type, id: result._id }] : []
const providesMongoList = <T extends string>(type: T) => (results: Array<any> | undefined) => results 
? [{ type, id: "LIST" } , ...results.map(result => ({ type, id: result._id }))]
: []
const invalidateLists = <T extends string>(type: T) => (result: any) => result ? [{ type, id: 'LIST' }] : []

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: headers => {
      headers.set("X-Requested-With", "XMLHttpRequest")
      headers.set("Content-Type", "application/json")
      return headers;
    },
  }),
  tagTypes: [
    'Board'
  ],
  endpoints: builder => ({
    userData: builder.query({
      query: () => '/v1/auth/me'
    }),
    createBoard: builder.mutation<IBoard, { 
      title: string
      publicWrite: boolean
      publicRead: boolean
     }>({
      query: boardPayload => ({
        url: "/v1/boards",
        method: "POST",
        body: boardPayload
      }),
      invalidatesTags: invalidateLists('Board')
    }),
    updateBoard: builder.mutation<IBoard, { _id: string, patchStrategies: {
      assign?: { publicWrite?: boolean, publicRead?: boolean }
      createColumn?: { title: string }
      linkColumn?: { columnId: string }
      removeColumn?: { columnId: string }
      removeUser?: { userId: string }
      addUser?: { userEmail: string, isAdmin: boolean }
    } }>({
      query: params => {
        return {
          url: `/v1/boards/${params._id}`,
          method: "PATCH",
          body: params.patchStrategies
        }
      },
      transformResponse: (res: IBoard) => {
        const schema = BoardN
        const { result: normalizedResult, entities } = normalize(res, schema)
        reduxStore.dispatch(mergeEntities(entities))
        return normalizedResult
      },
      invalidatesTags: result => result ? [{ type: "Board", id: result._id }] : []
    }),
    singleBoard: builder.query<string, string>({
      query: (boardId: string) => `/v1/boards/${boardId}`,
      transformResponse: (res: IBoard ) => {
        const schema = BoardN
        const { result: normalizedResult, entities } = normalize(res, schema)
        reduxStore.dispatch(mergeEntities(entities))
        return normalizedResult
      }
    }),
    singleBoardAdmin: builder.query<IBoardAdmin, string>({
      query: (boardId: string) => `/v1/boards/${boardId}?private=true&selectset=admin`,
      providesTags: result => result ? [{ type: "Board", id: result._id }] : []
    }),
    updateColumn: builder.mutation<IColumn, { _id: string, patchStrategies: {
      setRows?: { rows: Array<{ content: string }> } 
    } }>({
      query: params => {
        return {
          url: `/v1/columns/${params._id}`,
          method: "PATCH",
          body: params.patchStrategies
        }
      },
      transformResponse: (res: any) => {
        const schema = ColumnN
        const { result: normalizedResult, entities } = normalize(res, schema)
        reduxStore.dispatch(mergeEntities(entities))
        return normalizedResult
      }
    }),
    boards: builder.query<Array<IBoard>, void>({
      query: () => `/v1/boards`
    })
  })
})

export const { 
  useUserDataQuery,
  useSingleBoardQuery,
  useBoardsQuery,
  useSingleBoardAdminQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useUpdateColumnMutation
} = apiSlice

export interface IUser {
  _id: string
  ID: string
  email: string
  passwordHash: string
}

export interface IBoardAdmin {
  _id: string
  ID: string
  title: string
  publicRead: boolean,
  publicWrite: boolean,
  adminAccessUsers: Array<IUser>
  readAccessUsers: Array<IUser>
  columns?: Array<IColumn>
}

export interface IBoard {
  _id: string
  ID: string
  title: string
  publicRead: boolean,
  publicWrite: boolean,
  adminAccessUsers: Array<string>
  readAccessUsers: Array<string>
  columns?: Array<IColumn>
}

export interface IColumn {
  _id: string
  ID: string
  title: string
  board: string
  rows: Array<IRow>
}

export interface IRow {
  _id: string
  ID: string
  content: string
}