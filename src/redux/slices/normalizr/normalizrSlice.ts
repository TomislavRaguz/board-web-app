import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { denormalize, normalize, schema } from 'normalizr';
import { apiFetch } from "../../../lib";
import { DropResult } from "react-beautiful-dnd";
import { ColumnN } from "./schemas";
import { deepMergeObjs } from "../../../lib/mergeObjects";

export const handleDragAndDropOptimistic = createAsyncThunk('column', async (payload: DropResult, thunkAPI) => {
  const { normalizr }: any = thunkAPI.getState()
  const { source, destination } = payload;
 
  if(!destination) return
  const [sourceColumn, destinationColumn] = denormalize([
    source.droppableId, destination.droppableId
  ], [ColumnN], normalizr)
  let targetRow = sourceColumn.rows[source.index]
  targetRow = { _id: targetRow._id, content: targetRow.content }
  if(sourceColumn !== destinationColumn) {
    let sourceRows = sourceColumn.rows.map((row:any) => ({ _id: row._id, content: row.content }))
    let destinationRows = destinationColumn.rows.map((row:any) => ({ _id: row._id, content: row.content }))
    sourceRows.splice(source.index, 1)
    destinationRows.splice(destination.index, 0, targetRow)
    const { entities } = normalize([
      { _id: sourceColumn._id, rows: sourceRows },
      { _id: destinationColumn._id, rows: destinationRows }
    ], [ColumnN])

    thunkAPI.dispatch(mergeEntities(entities))

    try {
      await Promise.all([
        apiFetch(`/api/v1/columns/${sourceColumn._id}`, {
          method: "PATCH",
          body: { setRows: { rows: sourceRows }}
        }),
        apiFetch(`/api/v1/columns/${destinationColumn._id}`, {
          method: "PATCH",
          body: { setRows: { rows: destinationRows }}
        })
      ])
    } catch (e) {
      console.log(e)
    }
  } else {
    let newRows = sourceColumn.rows.map((row:any) => ({ _id: row._id, content: row.content }))
    newRows.splice(source.index, 1)
    newRows.splice(destination.index, 0, targetRow)
    const { entities } = normalize({ _id: sourceColumn._id, rows: newRows }, ColumnN)
    thunkAPI.dispatch(mergeEntities(entities))
    try {
      await apiFetch(`/api/v1/columns/${sourceColumn._id}`, {
        method: "PATCH",
        body: { setRows:  { rows: newRows } }
      })
    } catch (e) {
      console.log(e)
    }
  }
})

export const normalizrSlice = createSlice({
  name: "normalizr",
  initialState: {},
  reducers: {
    mergeEntities(state, action) {
      return deepMergeObjs(state, action.payload)
    }
  }
})

export const { mergeEntities } = normalizrSlice.actions;

