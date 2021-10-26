export * from './apiFetch'
export * from './useOuterClick'
export * from './mergeObjects'

export function ID(typename: string, ID: string) {
  if(ID.substring(0, typename.length) !== typename) {
    throw Error(`Expected ID of type ${typename}, instead got ${ID}`)
  }
  return ID.substring(typename.length+1)
}