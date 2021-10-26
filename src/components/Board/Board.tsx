import { Typography } from "@mui/material";
import { css } from "@mui/styled-engine";
import { denormalize } from "normalizr";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useSingleBoardQuery } from "../../redux/slices/api";
import { handleDragAndDropOptimistic as columnDragAndDropAction } from '../../redux/slices/normalizr/normalizrSlice';
import { BoardN } from "../../redux/slices/normalizr/schemas";
import { useAppDispatch } from "../../redux/store";
import { BoardManagementForm } from "./BoardManagementForm";
import { Column } from "./Column";
import { ColumnForm } from "./ColumnForm";
import { ColumnLinker } from "./ColumnLinker";

export function Board (props: { boardId: string }) {
  const { isLoading, error, data } = useSingleBoardQuery(props.boardId)

  const normalizr = useSelector(state => state.normalizr)
  const auth = useSelector(state => state.auth)
  const dispatch = useAppDispatch();

  if(isLoading) return <p>Loading</p>
  if(error) return <p>Error</p>
  const board = denormalize(data, BoardN, normalizr)
  if(!auth.user) return <Redirect to='/login' />
  
  const isAdmin = board.adminAccessUsers.includes(auth.user._id)
  const hasWriteAccess = board.publicWrite || isAdmin;
 
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if(!hasWriteAccess) return
    if(!destination) return
    if(source.droppableId === destination.droppableId && source.index === destination.index) return
    dispatch(columnDragAndDropAction(result))
  }

  return (
    <div css={styles.boardContainer}>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <div css={styles.boardHeader}>
          <Typography component="h1">Board: {board.title}</Typography>
          {isAdmin && <BoardManagementForm boardId={board._id} />}
        </div>
        
        <div css={{ display: 'flex' }}>
          {board.columns.map((column: any) => <Column key={column._id} column={column} boardId={board._id}/>)}
          {hasWriteAccess && (
            <div css={styles.newColumnContainer}>
              <div css={styles.newColumnHeader}>
                <span>New column</span>
              </div>
              <div css={{ padding: 5 }}>
                <ColumnForm boardID={board.ID!} />
                <div css={{ textAlign: 'center', marginTop: 15 }}>OR</div>
                <ColumnLinker boardID={board.ID!} />
              </div>
            </div>
          )}
        </div>

      </DragDropContext>  
    </div>
  )
}

const styles = {
  boardContainer: css({ 
    position: 'fixed', 
    inset: 0, 
    top: 80, 
    bottom: 0, 
    backgroundImage: 'url("/planet.jpg")',
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover', 
    overflowX: 'scroll' 
  }),
  boardHeader: css({
    backgroundColor: 'white', 
    margin: 15, 
    padding: 5
  }),
  newColumnContainer: css({
    margin: 15, 
    width: 180, 
    backgroundColor: "white", 
    borderRadius: 5, 
    flexShrink: 0
  }),
  newColumnHeader: css({
    display: "flex", 
    borderBottom: '1px solid gray',
    backgroundColor: "white", 
    padding: 5
  })
}