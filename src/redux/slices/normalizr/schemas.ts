import { schema } from "normalizr";

export const ColumnN = new schema.Entity('columns', {}, { idAttribute: "_id" })
export const BoardN = new schema.Entity('boards', {
  columns: [ColumnN]
}, { idAttribute: "_id" });